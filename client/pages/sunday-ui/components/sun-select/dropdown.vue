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
      top: 'inherit',
      isBottom: false
    };
  },
  provide() {
    return {
      dropdown: this
    };
  },
  inject: ['select'],
  computed: {
    styleObject() {
      return {
        top: this.top,
        'transform-origin': this.top === 'inherit' ? 'center top !important' : 'center bottom !important'
      };
    }
  },
  mounted() {
    this.isInViewport();
    const scrollMethod = () => {
      if ((Date.now() - scrollMethod.now) > 50) {
        this.isInViewport();
        scrollMethod.now = Date.now();
      }
    };
    scrollMethod.now = 0;
    window.addEventListener('scroll', scrollMethod); // 监听滚动菜单位置变化
    document.addEventListener('click', this.select.handle); // 监听点击document下拉框消失
    this.$once('beforeDestroy:hook', () => {
      window.removeEventListener('scroll', scrollMethod);
      document.removeEventListener('click', this.select.handle);
    });
  },
  updated() {
    this.isInViewport();
  },
  methods: {
    isInViewport() {
      this.$nextTick(() => {
        const dropdown = this.$refs.dropdown;
        const viewHeight = document.documentElement.clientHeight;
        if (!dropdown) return;
        if ((dropdown.getBoundingClientRect().top + dropdown.clientHeight) > viewHeight) {
          this.isBottom = true;
          this.top = -dropdown.clientHeight - 26 + 'px';
        } else {
          this.isBottom = false;
          this.top = 'inherit';
        }
      });
    }
  }
};
</script>