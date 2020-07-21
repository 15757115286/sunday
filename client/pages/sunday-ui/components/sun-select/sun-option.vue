<template>
  <li
    class="sun-select-dorpdown__item"
    :class="{'selected':select.value===label,'is-disabled':disabled}"
    @click.stop="handle"
    @mousemove.prevent
  >
    <slot>{{ label }}</slot>
  </li>
</template>
<script>
import '../../assets/scss/style.vue.scss';
export default {
  name: 'SunOption',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
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
      if (this.select.multiple) {
        const index = this.select.tags.indexOf(this.label);
        if (index !== -1) {
          this.select.tags.splice(index, 1);
        }
        this.select.tags.push(this.label);
        return;
      }
      this.select.$emit('input', this.label);
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