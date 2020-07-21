<template>
  <div
    class="row"
    :style="styleObject"
  >
    <slot />
  </div>
</template>
<script>
import '../../assets/scss/style.vue.scss';
export default {
  name: 'SunRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  },
  computed: {
    styleObject() {
      return {
        'margin-left': -this.gutter / 2 + 'px',
        'margin-right': -this.gutter / 2 + 'px'
      };
    }
  }
};
</script>
<style scoped>
