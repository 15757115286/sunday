<template>
  <li
    class="sun-select-dorpdown__item"
    :class="{'selected':select.value===lable,'is-disabled':disabled}"
    @click.stop="handle"
    @mousemove.prevent
  >
    <slot>{{ lable }}</slot>
  </li>
</template>
<script>
import '../../assets/scss/style.vue.scss';
export default {
  name: 'SunOption',
  props: {
    lable: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    disabled: {
      default: false
    }
  },
  inject: ['select'],
  mounted() {
    document.addEventListener('click', this.select.handle);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.select.handle);
    });
  },
  methods: {
    handle() {
      if (this.disabled) return;
      this.select.$emit('input', this.lable);
      if (this.select.drop === false) {
        this.select.suffixIcon = 'shouqi';
        this.select.drop = true;
      } else {
        this.select.suffixIcon = 'xiala';
        this.select.drop = false;
      }
    }
  }
};
</script>