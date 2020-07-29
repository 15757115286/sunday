<template>
  <div
    ref="dropdown"
    class="sun-select-dropdown"
    :style="styleObject"
  >
    <div
      v-if="!isBottom"
      class="poper_arrow__top"
    />
    <sun-scrollbar :max-height="270">
      <p
        v-if="empty"
        class="sun-select-dropdown__empty"
      >
        无匹配数据
      </p>
      <ul
        ref="ul"
        class="sun-select-dropdown__list"
      >
        <slot />
      </ul>
    </sun-scrollbar>
    <div
      v-if="isBottom"
      class="poper_arrow__bottom"
    />
  </div>
</template>
<script>
import SunScrollbar from '../sun-scrollbar';
export default {
  name: 'SunDropdown',
  components: {
    [SunScrollbar.name]: SunScrollbar
  },
  data() {
    return {
      empty: false,
      top: 'default',
      isBottom: false
    };
  },
  provide() {
    return {
      dropdown: this
    };
  },
  computed: {
    styleObject() {
      return {
        top: this.top + 'px',
        'transform-origin': this.top === 'default' ? 'center top !important' : 'center bottom !important'
      };
    }
  },
  mounted() {
    const dropdown = this.$refs.dropdown;
    const bodyRect = document.body.getBoundingClientRect();
    console.log(dropdown.getBoundingClientRect());
    console.log(dropdown.clientHeight);
    if ((dropdown.getBoundingClientRect().bottom + dropdown.clientHeight) > bodyRect.bottom) {
      this.isBottom = true;
      this.top = -dropdown.clientHeight - 26;
    }
  },
  methods: {
  }
};
</script>