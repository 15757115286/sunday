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
      bindHandleInput: this.handleInput.bind(this),
      show: true
    };
  },
  inject: ['select', 'dropdown'],
  mounted() {
    document.addEventListener('click', this.select.handle);
    this.select.$refs.input.addEventListener('input', this.bindHandleInput);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.select.handle);
    });
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
      if (this.select.filterable) {
        if (!this.label.includes(e.target.value) && e.target.value !== '') {
          this.show = false;
        } else {
          this.show = true;
        }
        this.$nextTick(() => {
          if (typeof this.dropdown.$refs.ul !== 'undefined') {
            if (this.dropdown.$refs.ul.clientHeight === 12) {
              this.dropdown.empty = true;
            } else {
              this.dropdown.empty = false;
            }
          }
        });
      }
    }
  }
};
</script>