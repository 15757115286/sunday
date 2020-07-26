<template>
  <div @click="doClick">
    hello,{{ judgement }},count: {{ count }}
  </div>
</template>
<script>
export default {
  name: 'Demo',
  props: {
    judgement: {
      type: String,
      default: 'judgement'
    }
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    doClick() {
      this.count++;
      this.$emit('countChange', this.count);
    }
  }
};
</script>