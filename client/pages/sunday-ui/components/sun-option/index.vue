<template>
    <li class="sun-select-dorpdown_item" @click.stop="handle" :class="{'selected':$parent.value===lable}">
        {{lable}}
    </li>
</template>
<script>
import '../../assets/scss/style.vue.scss';
export default {
  name: 'sun-option',
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
    handle () {
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