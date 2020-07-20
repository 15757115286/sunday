<template>
  <div class="sun-input-group" :class="inputGroupObject">
    <div class="sun-input-group-prepend" v-if="$slots.prepend">
      <span :class="{'sun-input-group-text': !isButtonPrepend}">
        <slot name="prepend"></slot>
      </span>
    </div>
    <input
      type="text"
      class="sun-form-control"
      ref="input"
      :class="inputClass"
      :value="value"
      v-on="inputListeners"
      v-bind="$attrs"
      @mouseenter="handleIconMouseenter"
      @mouseleave="handleIconMouseleave"
    />
    <span
    v-if="suffixIcon && !clearable"
    @click="$emit('icon-click',$event.target)"
    class="suffix-icon">
      <sun-icon :type="suffixIcon"></sun-icon>
    </span>
    <span
     v-if="prefixIcon"
     class="prefix-icon"
     @click="$emit('icon-click',$event.target)">
      <sun-icon :type="prefixIcon"></sun-icon>
    </span>
    <span
    v-if="clearIcon"
    class="suffix-icon"
    @mouseenter="handleIconMouseenter"
    @click="handleIconClick">
      <sun-icon ref="clear" type="roundclosefill"></sun-icon>
    </span>
    <div class="sun-input-group-append" v-if="$slots.append">
      <span :class="{'sun-input-group-text': !isButtonAppend}">
        <slot name="append"></slot>
      </span>
    </div>
  </div>
</template>
<script>
import '../../assets/scss/style.vue.scss';
import SunIcon from '../sun-icon';
import { INPUT_SIZE_GROUP } from './constant';
export default {
  name: 'sun-input',
  components: {
    [SunIcon.name]: SunIcon
  },
  inheritAttrs: false,
  data() {
    return {
      clearIcon: false
    };
  },
  props: {
    value: {
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
          return nodes[0].tag.includes('button');
        }
      }
      return false;
    },
    // 当右边slot是按钮时，去掉.sun-input-group-text
    isButtonAppend() {
      const nodes = this.$slots.append;
      if (nodes !== undefined) {
        if (nodes[0].tag !== undefined) {
          return nodes[0].tag.includes('button');
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
  },
  mounted() {
    this.bindHandleOtherClick = this.handleOtherClick.bind(this);
    document.addEventListener('click', this.bindHandleOtherClick);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.bindHandleOtherClick);
    });
  }
};
</script>
