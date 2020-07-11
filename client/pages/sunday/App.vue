<template>
    <div class="sunday">
        this is sunday app {{ name }}
        <button @click="beatCm">触发点击</button>
    </div>
</template>
<script>
import { add } from './utils';
import './asset/comm.scss';
add(1, 2);

export default {
  name: 'sunday',
  data () {
    return {
      name: 'xwt44sxw'
    };
  },
  methods: {
    async beatCm () {
      const _now = Date.now();
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
      console.log('xwt33' + (Date.now() - _now));
    }
  }
};
</script>
<style lang="scss">
.sunday {
    color: green;
}
</style>
