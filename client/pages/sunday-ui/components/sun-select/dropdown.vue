<template>
  <div
    v-show="!remoteEmpty"
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
      :class="{'is-empty':empty}"
    >
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
      remoteEmpty: this.select.remote,
      top: 0,
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
        top: this.top + 'px',
        'transform-origin': !this.isBottom ? 'center top !important' : 'center bottom !important'
      };
    }
  },
  mounted() {
    const inputMethod = (e) => {
      this.handleInput(e);
    };
    this.select.$refs.input.addEventListener('input', inputMethod);
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
    isInViewport() {
      this.$nextTick(() => {
        const dropdown = this.$refs.dropdown;
        const viewHeight = document.documentElement.clientHeight;
        const input = this.select.$refs.input;
        if (!dropdown) return;
        if (!this.isBottom) {
          if ((dropdown.getBoundingClientRect().top + dropdown.clientHeight) > viewHeight) {
            this.isBottom = true;
            this.top = -dropdown.clientHeight - 26;
          }
        } else {
          if ((dropdown.getBoundingClientRect().bottom + input.clientHeight + dropdown.clientHeight + 26 + 2) <= viewHeight) {
            this.isBottom = false;
            this.top = this.select.$refs.input.clientHeight + 2;
          }
        }
      });
    },
    handleInput(e) {
      const select = this.select;
      const ul = this.$refs.ul;
      if (select.remote) {
        if (typeof select.remoteMethod === 'function') {
          select.remoteMethod(e.target.value);
          this.remoteEmpty = false;
        }
      }
      this.$nextTick(() => {
        if (select.filterable) {
          if (typeof ul !== 'undefined') {
            if (ul.clientHeight === 12 || ul.clientHeight === 0) {
              this.empty = true;
            } else {
              this.empty = false;
            }
          }
        }
        if (select.filterable || select.remote) {
          this.isInViewport(); // 搜索后调整搜索框高度
        }
      });
    }
  }
};
</script>