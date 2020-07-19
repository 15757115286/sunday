<template>
  <div>
    <div class="sun-select" @click="toggle">
      <input
      type="text"
      class="sun-form-control"
      autocomplete="off"
      readonly
      ref="input"
      :value="value"
      :disabled="disabled"
      @input="$emit('input',$event.target.value)"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
    />
     <span  class="suffix-icon" @click="handleIconClick" @mouseenter="handleMouseenter">
      <sun-icon :type="suffixIcon" ref="icon"></sun-icon>
    </span>
    </div>
    <transition  name="sun-zoom-in-top">
      <div v-if="drop" class="sun-select-dropdown">
        <div class="poper_arrow"></div>
        <sun-scrollbar :max-height="270">
            <ul class="sun-select-dropdown__list">
              <slot></slot>
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
export default {
  name: 'sun-select',
  components: {
    [SunInput.name]: SunInput,
    [SunScrollbar.name]: SunScrollbar,
    [SunIcon.name]: SunIcon
  },
  data() {
    return {
      suffixIcon: 'xiala',
      drop: false,
      handle: this.handleClick.bind(this)
    };
  },
  provide() {
    return {
      select: this
    };
  },
  props: {
    value: {

    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      if (this.drop === false) {
        this.suffixIcon = 'shouqi';
        this.drop = true;
      } else {
        this.suffixIcon = 'xiala';
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
    handleIconClick() {
      if (this.suffixIcon === 'roundclosefill') {
        this.$emit('input', '');
      }
    },
    handleMouseleave() {
      if (this.suffixIcon === 'roundclosefill') {
        this.suffixIcon = 'xiala';
      }
    }
  }
};
</script>
