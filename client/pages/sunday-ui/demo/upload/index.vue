<template>
  <div style="padding:32px">
    <p>按钮上传</p>
    <div style="margin-bottom:24px">
      <sun-upload multiple :files-list="filesList">
        <sun-button>点击上传</sun-button>
        <template #tip>
          <span class="sun-tip">文件只能上传jpg/png，且不超过500kb</span>
        </template>
      </sun-upload>
    </div>
    <p>拖拽上传</p>
    <div>
      <sun-upload
        multiple
        drag
        :limit="1"
        @on-exceed="handleExceed($event)">
      >
        <template #tip>
          <span class="sun-tip">文件只能上传jpg/png，且不超过500kb</span>
        </template>
      </sun-upload>
    </div>
  </div>
</template>
<script>
import { SunUpload, SunButton } from "../../components";
export default {
  name: "upload-demo",
  components: {
    [SunUpload.name]: SunUpload,
    [SunButton.name]: SunButton
  },
  data() {
    return {
      filesList: [{ name: "xwt.jpg" }, { name: "cmcm.jpg" }]
    };
  },
  methods: {
    handleExceed(e) {
      alert(e.length);
    },
    handleView() {
      alert("必须是图片");
    }
  }
};
</script>