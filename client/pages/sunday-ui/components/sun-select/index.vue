<template>
  <div>
    <div class="sun-select" @click="toggle">
      <input
      type="text"
      class="sun-form-control"
      autocomplete="off"
      readonly
      ref="input"
      :class="inputClass"
      :value="value"
      :disabled="disabled"
      @input="$emit('input',$event.target.value)"
    />
     <span  class="suffix-icon" @click="$emit('icon-click',$event.target)">
      <sun-icon :type="suffixIcon"></sun-icon>
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
      if (this.suffixIcon === 'xiala') {
        this.suffixIcon = 'shouqi';
        this.drop = true;
      } else {
        this.suffixIcon = 'xiala';
        this.drop = false;
      }
    },
    handleClick(e) {
      if (e.target !== this.$refs.input) {
        this.drop = false;
        this.suffixIcon = 'xiala';
      }
    }
  }
};
</script>
