<template>
  <li
    class="sun-select-dorpdown_item"
    :class="{'selected':$parent.value===lable}"
    @click.stop="handle"
  >
    {{ lable }}
  </li>
</template>
<script>
export default {
  name: 'SunOption',
  props: {
    lable: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    handle() {
      this.$parent.$emit('input', this.lable);
      if (this.$parent.suffixIcon === 'xiala') {
        this.$parent.suffixIcon = 'shouqi';
        this.$parent.drop = true;
      } else {
        this.$parent.suffixIcon = 'xiala';
        this.$parent.drop = false;
      }
    }
  }
};
</script>