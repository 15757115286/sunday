<template>
    <button :class="btnClass" >
      <span> <slot></slot></span> 
      <i class="iconfont icon-jinwenzi"></i>
    </button>
</template>

<script>
import "../../assets/scss/style.vue.scss";
import "../../assets/scss/vendor/iconfont.scss";
import { BUTTON_TYPE_LIST } from "./constant";
import {PREFIX} from "../../prefix"
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
    round:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    btnClass() {
      return {
        [ PREFIX+"button"]: true,
        [PREFIX+"button-" + this.type]: !this.plain, //基本按钮
        [PREFIX+"button-outline-" + this.type]: this.plain, //朴素按钮
        "is-round":this.round //圆形按钮
      };
    }
  }
};
</script>
