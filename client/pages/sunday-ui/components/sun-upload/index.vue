<template>
  <div>
    <div @click="$refs.input.click()">
      <input type="file" v-bind="$attrs" ref="input" @change="changeFile()" />
      <slot v-if="!drag"></slot>
      <div
        v-if="drag"
        class="up-load-dragger"
        @dragenter.prevent
        @dragover.prevent
        @drop.prevent.stop="dropFile($event)"
      >
        <sun-icon class="up-load-icon" type="shangchuan"></sun-icon>
        <p class="up-load-text">
          将文件拖到此处，或
          <em class="up-load-em">点击上传</em>
        </p>
      </div>
    </div>
    <slot name="tip"></slot>
    <ul v-if="filesList" class="sun-up-list">
        <li v-for="(file,index) in filesList" :key="index" class="sun-up-list_item">
            <a class="sun-upload-list__item-name">
                <sun-icon type="fuzhi"></sun-icon>
                {{file.name}}
            </a>
            <sun-icon type="radiobutton" class="sun-upload-list__item-status"></sun-icon>
        </li>
    </ul>
  </div>
</template>
<script>
import "../../assets/scss/style.vue.scss";
import SunIcon from "../sun-icon";
import { PREFIX } from "../../prefix";
export default {
  name: "sun-upload",
  components: {
    [SunIcon.name]: SunIcon
  },
  inheritAttrs: false,
  props: {
    drag: {
      type: Boolean,
      defalut: false
    },
    limit: {
      type: Number,
      defalut: 100
    },
    filesList:{
        type:Array,
        defalut:null
    }
  },
  methods: {
    dropFile(e) {
      let dt = e.dataTransfer;
      let files = dt.files;
      if (files.length > this.limit) {
        this.$emit("on-exceed", files); //文件超过limit时会触发on-exceed事件
      }
      this.$emit("on-change",files);//文件上传的钩子函数
      console.log(files)
    },
    changeFile() {
      let files = this.$refs.input.files;
      if (files.length > this.limit) {
        this.$emit("on-exceed", files); //文件超过limit时会触发on-exceed事件
      }
      this.$emit("on-change",files) //文件上传的钩子函数
    }
  }
};
</script>
<style scoped lang="scss">
input[type="file"] {
  display: none !important;
}
</style>