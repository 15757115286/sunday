<template>
  <div :class="btnGroupClasss">
    <slot></slot>
  </div>
</template>

<script>
import '../../assets/scss/style.vue.scss';
import { PREFIX } from '../../prefix';
export default {
  name: 'sun-button-group',
  data () {
    return {
      btnGroupClasss: {
        [PREFIX + 'button-group']: true
      }
    };
  }
};
</script>
