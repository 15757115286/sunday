<template>
  <div :class="btnGroupClasss">
    <slot />
  </div>
</template>

<script>
import { PREFIX } from '../../prefix';
export default {
  name: 'SunButtonGroup',
  data() {
    return {
      btnGroupClasss: {
        [PREFIX + 'button-group']: true
      }
    };
  }
};
</script>
