<template>
    <button :class="btnClass" >
      <span><slot></slot></span> 
    </button>
</template>

<script>
import "../../assets/scss/style.vue.scss";
import { BUTTON_TYPE_LIST } from "./constant";
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
        "sun-button": true,
        ["sun-button-" + this.type]: !this.plain, //基本按钮
        ["sun-button-outline-" + this.type]: this.plain, //朴素按钮
        "is-round":this.round //圆形按钮
      };
    }
  }
};
</script>
