<template>
    <li class="sun-select-dorpdown__item" @click.stop="handle" :class="{'selected':select.value===lable,'is-disabled':disabled}" @mousemove.prevent>
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
    },
    disabled: {
      default: false
    }
  },
  inject: ['select'],
  methods: {
    handle() {
      if (this.disabled) return;
      this.select.$emit('input', this.lable);
      if (this.select.suffixIcon === 'xiala') {
        this.select.suffixIcon = 'shouqi';
        this.select.drop = true;
      } else {
        this.select.suffixIcon = 'xiala';
        this.select.drop = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.select.handle);
  },
  destroyed() {
    document.removeEventListener('click', this.select.handle);
  }
};
</script>