<template>
  <li
    v-show="show"
    class="sun-select-dorpdown__item"
    :class="{'selected':select.value===label || select.tags.includes(label),'is-disabled':disabled}"
    @click.stop="handle"
    @mousemove.prevent
  >
    <slot>{{ label }}</slot>
  </li>
</template>
<script>
export default {
  name: 'SunOption',
  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: { // 不能选
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true
    };
  },
  inject: ['select', 'dropdown'],
  mounted() {
    const searchMethod = (e) => {
      this.handleInput(e);
    };
    this.select.$refs.input.addEventListener('input', searchMethod);
  },
  methods: {
    handle() {
      if (this.disabled) return;
      if (this.select.multiple) {
        const index = this.select.tags.indexOf(this.label);
        if (index !== -1) {
          this.select.tags.splice(index, 1);
        } else {
          this.select.tags.push(this.label);
        }
        return;
      }
      this.select.$emit('input', this.label);
      if (this.select.drop === false) {
        this.select.suffixIcon = 'shouqi';
        this.select.drop = true;
      } else {
        this.select.suffixIcon = 'xiala';
        this.select.drop = false;
      }
    },
    handleInput(e) {
      const select = this.select;
      if (select.filterable) {
        if (!this.label.includes(e.target.value) && e.target.value !== '') {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    }
  }
};
</script>