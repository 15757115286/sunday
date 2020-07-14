<template>
    <div class="sun-scrollbar">
        <div class="sun-scrollbar__wrap" :style="styleObject"  @scroll="handleScroll" ref="view">
           <div class="sun-scrollbar__view" ><slot></slot></div>
        </div>
        <div v-if="viewHeight>maxHeight"
             class="is-vertical sun-scrollbar__bar"
             @click.stop
             @mousedown="trackYHandle($event)">
            <div class="sun-scrollbar__thumb"
                 :style="{'height':scrollbarHeight+'px','transform':'translateY('+moveY+'px) '+scale}"
                 :class="{'active':scale}"
                  @click.stop
                  @mousedown.stop="mousedownY=$event.clientY"
                  @mouseup.stop="mousedownY=0"
                  @mouseenter="scale='scaleX(1.5)'"
                  @mouseleave="scale='scaleX(1)'"
                  ref="barY">
            </div>
        </div>
         <div v-if="viewWidth>maxWidth"
              class="is-horizontal sun-scrollbar__bar"
              @click.stop
              @mousedown="trackXHandle($event)" >
            <div class="sun-scrollbar__thumb"
              :style="{'width':scrollbarWidth+'px','transform':'translateX('+moveX+'px)'}"
              @click.stop
              ref="barX"></div>
        </div>
    </div>
</template>
<script>
import '../../assets/scss/style.vue.scss';
export default {
  name: 'sun-scrollbar',
  data () {
    return {
      viewHeight: 0, // 滚动元素总高度
      viewWidth: 0, // 滚动元素总宽度
      scrollbarHeight: 0, // 纵向滚动条高度
      scrollbarWidth: 0, // 横向滚动条长度
      moveY: 0, // 纵向滚动条偏移量
      moveX: 0, // 横向滚动条偏移量
      mousedownY: 0,
      mousedownX: 0,
      scale: 'scaleX(1)'
    };
  },
  props: {
    maxHeight: {
      type: Number,
      default: 1500
    },
    maxWidth: {
      type: Number,
      default: 1500
    }
  },
  computed: {
    styleObject () {
      return {
        'max-height': this.maxHeight + 'px',
        'max-width': this.maxWidth + 'px',
        'margin-right': '-17px',
        'margin-bottom': '-17px'
      };
    }
  },
  mounted () {
    const scrollElement = this.$refs.view;
    this.viewHeight = Math.max(scrollElement.clientHeight, scrollElement.scrollHeight);
    this.viewWidth = Math.max(scrollElement.clientWidth, scrollElement.scrollWidth);
    this.scrollbarHeight = (this.maxHeight - 17) / this.viewHeight * (this.maxHeight - 17);
    this.scrollbarWidth = (this.maxWidth - 17) / this.viewWidth * (this.maxWidth - 17);
  },
  updated () {
    //  console.log(this.$refs.barY.getBoundingClientRect());
    // console.log(this.$refs.view.getBoundingClientRect());
  },
  methods: {
    handleScroll () {
      this.moveY = (this.$refs.view.scrollTop / this.viewHeight) * (this.maxHeight - 17);
      this.moveX = (this.$refs.view.scrollLeft / this.viewWidth) * (this.maxWidth - 17);
    },
    trackYHandle (e) {
      const barPointY = this.$refs.barY.getBoundingClientRect().y;
      const view = this.$refs.view;
      let range = 0; // 滚动条在Y移动的距离
      if (e.clientY < barPointY) {
        range = e.clientY - barPointY;
      } else {
        range = e.clientY - barPointY - this.scrollbarHeight;
      }
      this.moveY = this.moveY + range;
      view.scrollTop = view.scrollTop + range / (this.maxHeight - 17) * this.viewHeight;
    },
    trackXHandle (e) {
      const barPointX = this.$refs.barX.getBoundingClientRect().x;
      const view = this.$refs.view;
      let range = 0; // 滚动条在X移动的距离
      if (e.clientX < barPointX) {
        range = e.clientX - barPointX;
      } else {
        range = e.clientX - barPointX - this.scrollbarWidth;
      }
      this.moveX = this.moveX + range;
      view.scrollLeft = view.scrollLeft + range / (this.maxWidth - 17) * this.viewWidth;
    }
    // handleMoveY (e) {
    //   if (this.mousedownY > 0) {
    //     const viewy = this.$refs.view.getBoundingClientRect().y;
    //     const barPointY = this.$refs.barY.getBoundingClientRect().y;
    //     const upMaxRange = viewy - barPointY;
    //     const downMaxRange = (this.maxHeight - 17) - (barPointY - viewy + this.scrollbarHeight);
    //     const range = e.clientY - this.mousedownY;
    //     if (range >= 0 && range < downMaxRange) {
    //       this.moveY = this.moveY + range;
    //     }
    //     if (range < 0 && range > upMaxRange) {
    //       this.moveY = this.moveY + range;
    //     }
    //   }
    // }
  }
};
</script>