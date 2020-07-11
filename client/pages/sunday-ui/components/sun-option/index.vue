<template>
    <li class="sun-select-dorpdown_item">
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
  }
};
</script>