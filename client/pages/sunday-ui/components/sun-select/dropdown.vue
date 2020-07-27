<template>
  <div
    class="sun-select-dropdown"
  >
    <div class="poper_arrow" />
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
      empty: false
    };
  },
  provide() {
    return {
      dropdown: this
    };
  }
};
</script>