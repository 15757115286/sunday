<template>
  <div :class="colObject" :style="styleObject">
    <slot></slot>
  </div>
</template>
<script>
import '../../assets/scss/style.vue.scss';
export default {
  name: 'sun-col',
  props: {
    span: {
      type: Number,
      default: 6
    }
  },
  computed: {
    colObject () {
      return {
        ['col-md-' + this.span]: true
      };
    },
    styleObject () {
      return {
        'padding-left': this.$parent.gutter / 2 + 'px',
        'padding-right': this.$parent.gutter / 2 + 'px'
      };
    }
  }
};
</script>
