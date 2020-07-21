<template>
  <div
    class="sun-input-group"
    :class="inputGroupObject"
  >
    <div
      v-if="$slots.prepend"
      class="sun-input-group-prepend"
    >
      <span :class="{'sun-input-group-text': !isButtonPrepend}">
        <slot name="prepend" />
      </span>
    </div>
    <input
      ref="input"
      type="text"
      class="sun-form-control"
      :class="inputClass"
      :value="value"
      v-bind="$attrs"
      v-on="inputListeners"
      @mouseenter="handleIconMouseenter"
      @mouseleave="handleIconMouseleave"
    >
    <span
      v-if="suffixIcon && !clearable"
      class="suffix-icon"
      @click="$emit('icon-click',$event.target)"
    >
      <sun-icon :type="suffixIcon" />
    </span>
    <span
      v-if="prefixIcon"
      class="prefix-icon"
      @click="$emit('icon-click',$event.target)"
    >
      <sun-icon :type="prefixIcon" />
    </span>
    <span
      v-if="clearIcon"
      class="suffix-icon"
      @mouseenter="handleIconMouseenter"
      @click="handleIconClick"
    >
      <sun-icon
        ref="clear"
        type="roundclosefill"
      />
    </span>
    <div
      v-if="$slots.append"
      class="sun-input-group-append"
    >
      <span :class="{'sun-input-group-text': !isButtonAppend}">
        <slot name="append" />
      </span>
    </div>
  </div>
</template>
<script>
import '../../assets/scss/style.vue.scss';
import SunIcon from '../sun-icon';
import { INPUT_SIZE_GROUP } from './constant';
export default {
  name: 'SunInput',
  components: {
    [SunIcon.name]: SunIcon
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    size: {
      default: '',
      validator: function(value) {
        return INPUT_SIZE_GROUP.indexOf(value) !== -1;
      }
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      clearIcon: false
    };
  },
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        // 配合v-model工作
        input(event) {
          // 这个方法的this为window
          vm.$emit('input', event.target.value);
          vm.handleIconMouseenter();
        }
      });
    },
    // 当左边slot是按钮时，去掉.sun-input-group-text
    isButtonPrepend() {
      const nodes = this.$slots.prepend;
      if (nodes !== undefined) {
        if (nodes[0].tag !== undefined) {
          return nodes[0].tag.includes('SunButton');
        }
      }
      return false;
    },
    // 当右边slot是按钮时，去掉.sun-input-group-text
    isButtonAppend() {
      const nodes = this.$slots.append;
      if (nodes !== undefined) {
        if (nodes[0].tag !== undefined) {
          return nodes[0].tag.includes('SunButton');
        }
      }
      return false;
    },
    // 更改尺寸
    inputGroupObject() {
      return {
        ['sun-input-group-' + this.size]: this.size
      };
    },
    inputClass() {
      const { suffixIcon, prefixIcon, clearable, value } = this;
      return {
        'sun-input-suffix': suffixIcon || clearable,
        'sun-input-prefix': prefixIcon,
        'input-border-radius':
        suffixIcon || prefixIcon || (clearable && value !== '')
      };
    }
  },
  mounted() {
    this.bindHandleOtherClick = this.handleOtherClick.bind(this);
    document.addEventListener('click', this.bindHandleOtherClick);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.bindHandleOtherClick);
    });
  },
  methods: {
    handleIconClick() {
      this.$emit('input', '');
      this.$refs.input.focus();
      this.clearIcon = false;
    },
    handleIconMouseenter() {
      if (!this.clearable) return;
      if (this.value !== '') {
        this.clearIcon = true;
      }
    },
    handleIconMouseleave() {
      if (document.activeElement === this.$refs.input) return;
      this.clearIcon = false;
    },
    handleOtherClick(e) {
      if (!this.clearIcon) return;
      if (e.target !== this.$refs.input && e.target !== this.$refs.clear.$vnode.elm) {
        this.clearIcon = false;
      }
    }
  }
};
</script>
