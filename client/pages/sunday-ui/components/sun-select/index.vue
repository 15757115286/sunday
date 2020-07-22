<template>
  <div>
    <div
      class="sun-select"
      @click="toggle"
    >
      <input
        v-if="!multiple"
        ref="input"
        type="text"
        class="sun-form-control"
        autocomplete="off"
        readonly
        :value="value"
        :disabled="disabled"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
      <div v-if="multiple">
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
          ref="tagSpan"
          class="tags-span"
          :style="{'max-width':tagsWidth+'px'}"
        >
          <sun-tag
            v-for="tag of value"
            :key="tag"
            closable
            type="secondary"
            :label="tag"
            @close="handleClose(tag)"
          /></span>
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
      <div
        v-if="drop"
        class="sun-select-dropdown"
      >
        <div class="poper_arrow" />
        <sun-scrollbar :max-height="270">
          <ul class="sun-select-dropdown__list">
            <slot />
          </ul>
        </sun-scrollbar>
      </div>
    </transition>
  </div>
</template>
<script>
import '../../assets/scss/style.vue.scss';
import SunInput from '../sun-input';
import SunScrollbar from '../sun-scrollbar';
import SunIcon from '../sun-icon';
import SunTag from '../sun-tag';
export default {
  name: 'SunSelect',
  components: {
    [SunInput.name]: SunInput,
    [SunScrollbar.name]: SunScrollbar,
    [SunIcon.name]: SunIcon,
    [SunTag.name]: SunTag
  },
  props: {
    value: {},
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
    }
  },
  data() {
    return {
      suffixIcon: 'xiala',
      drop: false,
      handle: this.handleClick.bind(this),
      tags: [], // mutiple时，value为一个数组，$emit()需要传递一个数组过去，tags为这个角色
      tagsWidth: 0, // 最大宽度
      tagsHeight: 0 // 变化的高度
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
        this.handleInputHeight();
      }
    }
  },
  mounted() {
    if (this.multiple) {
      this.tagsWidth = this.$refs.input.clientWidth - 36;
      this.tagsHeight = this.$refs.tagSpan.clientHeight;
      this.tags = [...this.value];
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return;
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
      if (e.target !== this.$refs.input && e.target !== this.$refs.icon.$vnode.elm) {
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
        const span = this.$refs.tagSpan;
        console.log(span.clientHeight);
        if (span.clientHeight > 0) {
          this.$refs.input.style.height = 38 + span.clientHeight - 24 + 'px';
        }
      });
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  }
};
</script>
<style scoped lang="scss">
.sun-badge{
  margin-left: 4px;
}
input{
  padding-right: 36px;
}
</style>
