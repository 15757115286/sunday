<template>
  <div>123</div>
</template>
<script lang='ts'>
import * as test from './test';
import Vue from 'vue';
export default Vue.extend({
  name: 'TsDemo',
  mounted() {
    this.tt();
  },
  methods: {
    tt() {
      const test1 :any = test.test1;
      (test1 as test.Department).getName();
      console.log(test1.name);
    }
  }

});
</script>
