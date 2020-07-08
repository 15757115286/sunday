<template>
  <div class="sun-input-group">
    <div class="sun-input-group-prepend" v-if="$slots.prepend">
      <span class="sun-input-group-text">
        <slot name="prepend"></slot>
      </span>
    </div>
    <input
      type="text"
      class="sun-form-control"
      :value="value"
      v-on="inputListeners"
      v-bind="$attrs"
    />
    <div class="sun-input-group-append" v-if="$slots.append">
      <span class="sun-input-group-text">
        <slot name="append"></slot>
      </span>
    </div>
  </div>
</template>
<script>
import "../../assets/scss/style.vue.scss";
import SunIcon from "../sun-icon";
import { PREFIX } from "../../prefix";
export default {
  name: "sun-input",
  inheritAttrs: false,
  props: {
    value: {
      default: ""
    }
  },
  computed: {
    inputListeners() {
      let vm = this;
      return Object.assign({}, this.$listeners, {
        //配合v-model工作
        input(event) {
          //这个方法的this为window
          vm.$emit("input", event.target.value);
        }
      });
    }
  }
};
</script>