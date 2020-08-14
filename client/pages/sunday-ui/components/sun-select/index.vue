<template>
  <div class="select-range">
    <div
      class="sun-select"
      @click="toggle"
    >
      <!-- 由于input事件通常影响的是option和dropdown，故在dropdown和option组件中处理-->
      <input
        v-if="!multiple"
        ref="input"
        type="text"
        class="sun-form-control"
        autocomplete="off"
        :readonly="(!filterable || !drop) && (!remote)"
        :value="inputValue"
        :disabled="disabled"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        @focus="handleFocus"
        @compositionstart="search=false"
        @compositionend="handleComposition"
        @input="handleInput"
      >
      <div v-else>
        <input
          ref="input"
          type="text"
          class="sun-form-control"
          autocomplete="off"
          readonly
          :disabled="disabled"
          @mouseenter="handleMouseenter"
          @mouseleave="handleMouseleave"
        >
        <span
          v-if="!collapseTags"
          ref="tagSpan"
          class="tags-span"
        >
          <!-- after-leave 对于事件传值的另一种思路 -->
          <sun-tag
            v-for="tag of value"
            :key="tag"
            closable
            type="secondary"
            :label="tag"
            :after-leave="handleInputHeight.bind(this)"
            @close="handleClose(tag)"
          /></span>
        <span
          v-if="collapseTags && value"
          ref="tagSpan2"
          class="tags-span"
        >
          <!-- 这里一定要加key，不然vue会偷懒不更新 -->
          <sun-tag
            v-if="value.length > 0"
            :key="value[0]"
            type="secondary"
            :label="value[0]"
            closable
            unanimate
            @close="handleClose(value[0])"
          />
          <sun-tag
            v-if="value.length>1"
            type="secondary"
            unanimate
          >+ {{ value.length-1 }}</sun-tag>
        </span>
      </div>
      <span
        class="suffix-icon"
        @click="handleIconClick"
        @mouseenter="handleMouseenter"
      >
        <sun-icon
          ref="icon"
          :type="suffixIcon"
        />
      </span>
    </div>
    <transition name="sun-zoom-in-top">
      <sun-dropdown
        v-if="drop"
        ref="dropdown"
        :loading="loading"
      >
        <slot />
      </sun-dropdown>
    </transition>
  </div>
</template>
<script>
import SunInput from '../sun-input';
import SunIcon from '../sun-icon';
import SunTag from '../sun-tag';
import SunDropdown from '../sun-select/dropdown';
import mixins from '../mixins/mixins.ts';
export default {
  name: 'SunSelect',
  components: {
    [SunInput.name]: SunInput,
    [SunIcon.name]: SunIcon,
    [SunTag.name]: SunTag,
    [SunDropdown.name]: SunDropdown
  },
  mixins: [mixins],
  props: {
    value: {}, // value在multiple时为数组
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    remote: { // 远程搜索
      type: Boolean,
      default: false
    },
    remoteMethod: Function,
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      suffixIcon: 'xiala',
      drop: false,
      handle: this.handleClick.bind(this), // 点击document下拉菜单消失。inject到dropdown中使用
      tags: [], // mutiple时，value为一个数组，$emit()需要传递一个数组过去，tags为这个角色
      tagsWidth: 0, // 最大宽度
      tagsHeight: 0, // 变化的高度
      search: true, // 拼音搜索标记
      inputValue: this.value
    };
  },
  provide() {
    return {
      select: this
    };
  },
  watch: {
    tags() {
      this.$emit('input', this.tags);
    },
    value() {
      if (this.multiple) {
        if (this.value !== this.tags) {
          this.tags = [...this.value];
        }
        this.handleInputHeight();
      }
      this.inputValue = this.value;
    },
    loading() {
      const dropdown = this.$refs.dropdown;
      if (dropdown) {
        this.$nextTick(() => { // watch更新是异步，此时组件未更新，需要$nextTick()
          dropdown.isEmpty();
          dropdown.isInViewport();
        });
      }
    }
  },
  mounted() {
    if (this.multiple) {
      if (!this.collapseTags) {
        this.tagsHeight = this.$refs.tagSpan.clientHeight;
      }
      this.tags = [...this.value];
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return; // 不可点击item
      if (this.remote) return;
      if (this.drop === false) {
        if (this.suffixIcon !== 'roundclosefill') {
          this.suffixIcon = 'shouqi';
        }
        this.drop = true;
      } else {
        if (this.suffixIcon !== 'roundclosefill') {
          this.suffixIcon = 'xiala';
        }
        this.drop = false;
      }
    },
    handleClick(e) {
      if (e.target !== this.$refs.input && e.target !== this.$refs.icon.$vnode.elm && e.target !== this.$refs.tagSpan && e.target !== this.$refs.tagSpan2) {
        this.drop = false;
        this.suffixIcon = 'xiala';
      }
    },
    handleMouseenter() {
      if (!this.clearable) return;
      if (this.value !== '') {
        this.suffixIcon = 'roundclosefill';
      }
    },
    handleIconClick(e) {
      if (this.suffixIcon === 'roundclosefill') {
        e.stopPropagation();
        this.$emit('input', '');
        this.drop = false;
        this.suffixIcon = 'xiala';
      }
    },
    handleMouseleave() {
      if (this.suffixIcon === 'roundclosefill') {
        this.suffixIcon = 'xiala';
      }
    },
    handleInputHeight() {
      this.$nextTick(function() {
        if (this.collapseTags) return; // 如果是折叠搜索，则返回
        const span = this.$refs.tagSpan;
        if (span.clientHeight > 0) { // 如果存在标签
          this.$refs.input.style.height = 38 + span.clientHeight - 24 + 'px';
        }
      });
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleFocus(e) {
      if (this.filterable) {
        e.target.select();
      }
    },
    handleComposition(e) {
      this.search = true;
      this.handleInput(e);
    },
    handleInput(e) {
      if (this.search) {
        if (!e.target.readonly) {
          this.inputValue = e.target.value; // 搜索框在刷新的时候输入数据不被刷新掉
        }
        this.traverse(this, { SunOption: this.handleSearch.bind(this, e) }); // 找到option组件并进行同步搜索
        if (this.remote) { // 远程搜索
          if (e.target.value !== '') {
            this.drop = true;
          } else {
            this.drop = false;
          }
          if (typeof this.remoteMethod === 'function') {
            this.remoteMethod(e.target.value);
          }
        }
        this.$nextTick(() => {
          if (this.filterable || this.remote) {
            const dropdown = this.$refs.dropdown;
            if (dropdown) {
              dropdown.isEmpty();
              dropdown.isInViewport();
            }
          }
        });
      }
    },
    handleSearch(e, vm) { // 同步搜索
      if (this.filterable) {
        if (!vm.label.includes(e.target.value) && e.target.value !== '') { // 输入框不为空时，才判断下拉框内容
          vm.show = false;
        } else {
          vm.show = true;
        }
      }
    }

  }
};
</script>
<style scoped lang="scss">
.sun-badge{
  margin-left: 4px !important;
}
input{
  padding-right: 36px;
}
</style>
