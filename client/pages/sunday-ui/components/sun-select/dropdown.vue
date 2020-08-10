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
    <sun-scrollbar
      :max-height="270"
      :class="{'is-empty':empty || loading}"
    >
      <p
        v-if="empty && !loading"
        class="sun-select-dropdown__empty"
      >
        无匹配数据
      </p>
      <p
        v-if="loading"
        class="sun-select-dropdown__empty"
      >
        正在搜索中...
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
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      empty: false,
      top: 0,
      isBottom: false // 判断poper在上还是在下
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
        top: this.top + 'px',
        'transform-origin': !this.isBottom ? 'center top !important' : 'center bottom !important'
      };
    }
  },
  mounted() {
    this.top = this.select.$refs.input.clientHeight + 2;
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
  methods: {
    isInViewport() { // 判断下拉框是位置在上还是在下
      this.$nextTick(() => {
        const dropdown = this.$refs.dropdown;
        const viewHeight = document.documentElement.clientHeight;
        const input = this.select.$refs.input;
        if (!dropdown) {
          return;
        }
        const { bottom } = input.getBoundingClientRect();
        if ((bottom + dropdown.clientHeight + 2) >= viewHeight) {
          this.isBottom = true;
          this.top = -dropdown.clientHeight - 26;
        } else {
          this.isBottom = false;
          this.top = input.clientHeight + 2;
        }
      });
    },
    isEmpty() {
      const ul = this.$refs.ul;
      if (ul !== undefined) {
        if (ul.clientHeight === 12 || ul.clientHeight === 0) {
          this.empty = true;
        } else {
          this.empty = false;
        }
      }
    }
  }
};
</script>