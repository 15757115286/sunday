<template>
  <i :class="iconClass"></i>
</template>

<script>
import '../../assets/scss/style.vue.scss';
import { PREFIX } from '../../prefix';
export default {
  name: 'sun-icon',
  props: {
    type: {
      type: String,
      default: ''
    },
    rotate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass () {
      return {
        iconfont: this.type,
        [PREFIX + 'icon-' + this.type]: this.type,
        animate__animated: this.rotate,
        animate__rotating: this.rotate,
        animate__infinite: this.rotate
      };
    }
  }
};
</script>
