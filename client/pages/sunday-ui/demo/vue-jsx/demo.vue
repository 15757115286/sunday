<script>
export default {
  name: 'Demo',
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  render(h) {
    return h('h' + this.level, [this.$scopedSlots.default({ text: this.level })]);
  }
};
</script>