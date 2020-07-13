<template>
    <li class="sun-select-dorpdown_item" @click.stop="handle" :class="{'selected':select.value===lable}">
        <slot>{{lable}}</slot> 
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
  inject: ['select'],
  methods: {
    handle () {
      this.select.$emit('input', this.lable);
      if (this.select.suffixIcon === 'xiala') {
        this.select.suffixIcon = 'shouqi';
        this.select.drop = true;
      } else {
        this.select.suffixIcon = 'xiala';
        this.select.drop = false;
      }
    }
  }
};
</script>