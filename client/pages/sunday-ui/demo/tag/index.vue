<template>
  <div style="padding:32px">
    <div style="margin-bottom:32px">
      <p>标签</p>
      <sun-tag>标签一</sun-tag>
      <sun-tag type="info">
        标签二
      </sun-tag>
      <sun-tag type="success">
        标签三
      </sun-tag>
      <sun-tag type="danger">
        标签四
      </sun-tag>
      <sun-tag type="warning">
        标签五
      </sun-tag>
      <sun-tag type="light">
        标签六
      </sun-tag>
      <sun-tag type="dark">
        标签七
      </sun-tag>
      <sun-tag type="secondary">
        标签八
      </sun-tag>
    </div>
    <p>可移除标签</p>
    <div style="margin-bottom:32px">
      <sun-tag closable>
        标签一
      </sun-tag>
      <sun-tag
        type="info"
        closable
      >
        标签二
      </sun-tag>
      <sun-tag
        type="success"
        closable
      >
        标签三
      </sun-tag>
      <sun-tag
        type="danger"
        closable
      >
        标签四
      </sun-tag>
      <sun-tag
        type="warning"
        closable
      >
        标签五
      </sun-tag>
    </div>
    <p>可编辑标签</p>
    <div style="margin-bottom:32px">
      <sun-tag
        v-for="tag in tags"
        :key="tag"
        closable
        @close="handleClose(tag)"
      >
        {{ tag }}
      </sun-tag>
      <sun-input
        v-model="text"
        class="tag-input"
        size="sm"
        @click="handleClick"
        @blur="handleBlur"
      />
    </div>
    <p>不同尺寸</p>
    <div style="margin-bottom:32px">
      <sun-tag size="sm">
        sm标签
      </sun-tag>
      <sun-tag>默认标签</sun-tag>
      <sun-tag size="lg">
        lg标签
      </sun-tag>
    </div>
  </div>
</template>
<script>
import {
  SunTag,
  SunInput
} from '../../components';
export default {
  name: 'TagDemo',
  components: {
    [SunTag.name]: SunTag,
    [SunInput.name]: SunInput
  },
  data() {
    return {
      tags: ['标签一', '标签二', '标签三'],
      text: '+ new tag'
    };
  },
  methods: {
    handleClick() {
      this.text = '';
    },
    handleBlur() {
      const inputValue = this.text;
      if (inputValue !== '') {
        this.tags.push(inputValue);
      }
      this.text = '+ new tag';
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  }
};
</script>
<style lang="scss">
.sun-badge + .sun-badge{
    margin-left: 10px;
}
.tag-input{
    width: 85px;
   &:not(:first-child){
       margin-left: 10px;
   }
}
.tag-input input{
    height: 22px !important;
}
</style>