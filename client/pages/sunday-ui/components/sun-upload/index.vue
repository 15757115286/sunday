<template>
  <div>
    <div @click="$refs.input.click()">
      <input
        ref="input"
        type="file"
        v-bind="$attrs"
        @change="changeFile()"
      >
      <slot v-if="!drag" />
      <div
        v-if="drag"
        class="up-load-dragger"
        @dragenter.prevent
        @dragover.prevent
        @drop.prevent.stop="dropFile($event)"
      >
        <sun-icon
          class="up-load-icon"
          type="shangchuan"
        />
        <p class="up-load-text">
          将文件拖到此处，或
          <em class="up-load-em">点击上传</em>
        </p>
      </div>
    </div>
    <slot name="tip" />
    <ul
      v-if="filesList"
      class="sun-up-list"
    >
      <li
        v-for="(file,index) in filesList"
        :key="index"
        class="sun-up-list_item"
      >
        <a class="sun-upload-list__item-name">
          <sun-icon type="fuzhi" />
          {{ file.name }}
        </a>
        <sun-icon
          type="radiobutton"
          class="sun-upload-list__item-status"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import SunIcon from '../sun-icon';
export default {
  name: 'SunUpload',
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
    filesList: {
      type: Array,
      defalut: null
    }
  },
  methods: {
    dropFile(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > this.limit) {
        this.$emit('on-exceed', files); // 文件超过limit时会触发on-exceed事件
      }
      this.$emit('on-change', files);// 文件上传的钩子函数
      console.log(files);
    },
    changeFile() {
      const files = this.$refs.input.files;
      if (files.length > this.limit) {
        this.$emit('on-exceed', files); // 文件超过limit时会触发on-exceed事件
      }
      this.$emit('on-change', files); // 文件上传的钩子函数
    }
  }
};
</script>
<style scoped lang="scss">
input[type="file"] {
  display: none !important;
}
</style>
