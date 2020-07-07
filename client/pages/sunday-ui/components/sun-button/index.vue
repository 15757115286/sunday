<template>
  <button :class="btnClass">
    <i v-if="loading" class="iconfont sun-icon-loading animate__animated animate__rotating animate__infinite"></i>
    <i v-if="icon" :class="iconClass"></i>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
import "../../assets/scss/style.vue.scss";
import { BUTTON_TYPE_LIST, BUTTON_SIZE_LIST } from "./constant";
import { PREFIX } from "../../prefix";
export default {
  name: "sun-button",
  props: {
    type: {
      type: String,
      default: "primary",
      validator: function(value) {
        return BUTTON_TYPE_LIST.indexOf(value) !== -1;
      }
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default:"lg",
      validator(value) {
        return BUTTON_SIZE_LIST.indexOf(value) !== -1;
      }
    }
  },
  computed: {
    btnClass() {
      return {
        [PREFIX + "button"]: true,
        [PREFIX + "button-" + this.type]: !this.plain, //基本按钮
        [PREFIX + "button-outline-" + this.type]: this.plain, //朴素按钮
        "is-round": this.round, //圆形按钮
        "is-loading": this.loading, //加载中按钮
        [PREFIX+"button-"+this.size]:this.size
      };
    },
    iconClass() {
      return ["iconfont", this.icon];
    }
  }
};
</script>

