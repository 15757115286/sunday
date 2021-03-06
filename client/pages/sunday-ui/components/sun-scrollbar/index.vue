<template>
  <div class="sun-scrollbar">
    <div
      ref="view"
      class="sun-scrollbar__wrap"
      :style="styleObject"
      @scroll="handleScroll"
    >
      <div class="sun-scrollbar__view">
        <slot />
      </div>
    </div>
    <div
      v-if="viewHeight>maxHeight"
      class="is-vertical sun-scrollbar__bar"
      @click.stop
      @mousedown="trackYHandle($event)"
    >
      <div
        ref="barY"
        class="sun-scrollbar__thumb"
        :style="{'height':scrollbarHeight+'px','transform':'translateY('+moveY+'px)'}"
        @click.stop
        @mousedown="handleMousedownY"
      />
    </div>
    <div
      v-if="viewWidth>maxWidth"
      class="is-horizontal sun-scrollbar__bar"
      @click.stop
      @mousedown="trackXHandle($event)"
    >
      <div
        ref="barX"
        class="sun-scrollbar__thumb"
        :style="{'width':scrollbarWidth+'px','transform':'translateX('+moveX+'px)'}"
        @click.stop
        @mousedown="handleMousedownX"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SunScrollbar',
  props: {
    maxHeight: Number,
    maxWidth: Number
  },
  data() {
    return {
      viewHeight: 0, // 滚动元素总高度
      viewWidth: 0, // 滚动元素总宽度
      scrollbarHeight: 0, // 纵向滚动条高度
      scrollbarWidth: 0, // 横向滚动条长度
      moveY: 0, // 纵向滚动条偏移量
      moveX: 0, // 横向滚动条偏移量
      mousedownY: 0,
      mousedownX: 0,
      bindMousemoveY: this.handleMoveY.bind(this),
      bindMouseupY: this.hanleMouseupY.bind(this),
      bindMousemoveX: this.handleMoveX.bind(this),
      bindMouseupX: this.hanleMouseupX.bind(this),
      mb: this.maxWidth < this.viewWidth ? 17 : 0,
      mr: this.maxHeight < this.viewHeight ? -17 : 0
    };
  },
  computed: {
    styleObject() {
      return {
        'max-height': this.maxHeight + 'px',
        'max-width': this.maxWidth + 'px',
        'margin-right': this.mr + 'px',
        'margin-bottom': this.mb + 'px '
      };
    }
  },
  mounted() {
    const scrollElement = this.$refs.view;
    this.viewHeight = Math.max(
      scrollElement.clientHeight,
      scrollElement.scrollHeight
    );
    this.viewWidth = Math.max(
      scrollElement.clientWidth,
      scrollElement.scrollWidth
    );
    this.scrollbarHeight =
      ((this.maxHeight - this.mb) / this.viewHeight) * (this.maxHeight - this.mb - 4);
    this.scrollbarWidth =
      ((this.maxWidth - this.mr) / this.viewWidth) * (this.maxWidth - this.mr - 4);
  },
  destroyed() {
    document.removeEventListener('mousemove', this.bindMousemoveY);
    document.removeEventListener('mouseup', this.bindMouseupY);
    document.removeEventListener('mousemove', this.bindMousemoveX);
    document.removeEventListener('mouseup', this.bindMouseupX);
  },
  methods: {
    handleScroll() {
      this.moveY =
        (this.$refs.view.scrollTop / this.viewHeight) * (this.maxHeight - this.mb - 4);
      this.moveX =
        (this.$refs.view.scrollLeft / this.viewWidth) * (this.maxWidth - this.mr - 4);
    },
    trackYHandle(e) {
      const barPointY = this.$refs.barY.getBoundingClientRect().y;
      const view = this.$refs.view;
      let range = 0; // 滚动条在Y移动的距离
      if (e.clientY < barPointY) {
        range = e.clientY - barPointY;
      } else {
        range = e.clientY - barPointY - this.scrollbarHeight;
      }
      this.moveY = this.moveY + range;
      view.scrollTop =
        view.scrollTop + (range / (this.maxHeight - this.mb)) * this.viewHeight;
    },
    trackXHandle(e) {
      const barPointX = this.$refs.barX.getBoundingClientRect().x;
      const view = this.$refs.view;
      let range = 0; // 滚动条在X移动的距离
      if (e.clientX < barPointX) {
        range = e.clientX - barPointX;
      } else {
        range = e.clientX - barPointX - this.scrollbarWidth;
      }
      this.moveX = this.moveX + range;
      view.scrollLeft =
        view.scrollLeft + (range / (this.maxWidth - this.mr)) * this.viewWidth;
    },
    handleMousedownY(e) {
      e.stopImmediatePropagation();
      this.mousedownY = e.clientY;
      this.y = this.moveY;
      document.addEventListener('mousemove', this.bindMousemoveY);
      document.addEventListener('mouseup', this.bindMouseupY);
    },
    handleMoveY(e) {
      e.preventDefault();
      if (!this.mousedownY) return;
      const currentPos = e.clientY - this.mousedownY + this.y;
      const maxMoveY = this.maxHeight - this.mb - 4 - this.scrollbarHeight;
      if (currentPos <= 0) {
        this.moveY = 0;
      } else if (currentPos >= maxMoveY) {
        this.moveY = maxMoveY;
      } else {
        this.moveY = this.y + e.clientY - this.mousedownY;
      }

      this.$refs.view.scrollTop =
        (this.moveY / (this.maxHeight - this.mb - 4)) * this.viewHeight;
    },
    hanleMouseupY() {
      this.mousedownY = 0;
    },
    handleMousedownX(e) {
      e.stopImmediatePropagation();
      this.mousedownX = e.clientX;
      this.x = this.moveX;
      document.addEventListener('mousemove', this.bindMousemoveX);
      document.addEventListener('mouseup', this.bindMouseupX);
    },
    handleMoveX(e) {
      e.preventDefault();
      if (!this.mousedownX) return;
      const currentPos = e.clientX - this.mousedownX + this.x;
      const maxMoveX = this.maxWidth - this.mr - 4 - this.scrollbarWidth;
      if (currentPos <= 0) {
        this.moveX = 0;
      } else if (currentPos >= maxMoveX) {
        this.moveX = maxMoveX;
      } else {
        this.moveX = this.x + e.clientX - this.mousedownX;
      }

      this.$refs.view.scrollLeft =
        (this.moveX / (this.maxWidth - this.mr - 4)) * this.viewWidth;
    },
    hanleMouseupX() {
      this.mousedownX = 0;
    }
  }
};
</script>