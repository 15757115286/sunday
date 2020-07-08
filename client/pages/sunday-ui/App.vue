<template>
  <div style="padding:32px">
    <div style="margin-bottom:24px">
      <p>基本用法</p>
      <div style="margin-bottom:12px">
        <sun-button type="primary">基本按钮</sun-button>
        <sun-button type="info">信息按钮</sun-button>
        <sun-button type="success">成功按钮</sun-button>
        <sun-button type="warning">告警按钮</sun-button>
        <sun-button type="danger">危险按钮</sun-button>
      </div>
      <div>
        <sun-button :type="type" v-on:click.native="switchType">测试click：点击换色</sun-button>
        <sun-button type="primary" plain>朴素按钮</sun-button>
        <sun-button type="primary" round>圆形按钮</sun-button>
        <sun-button type="link">文字按钮</sun-button>
      </div>
    </div>
    <div style="margin-bottom:24px">
      <p>禁用状态</p>
      <sun-button type="primary" disabled>基本按钮</sun-button>
      <sun-button type="primary" plain disabled>朴素按钮</sun-button>
    </div>
    <div style="margin-bottom:24px">
      <p>图标按钮</p>
      <sun-button type="primary" icon="sun-icon-xiangqu">图标按钮</sun-button>
      <sun-button type="primary" icon="sun-icon-xiangqu"></sun-button>
    </div>
    <div style="margin-bottom:24px">
      <p>加载中按钮</p>
      <sun-button type="primary" :loading="true">加载中...</sun-button>
    </div>
    <div style="margin-bottom:24px">
      <p>按钮尺寸</p>
      <sun-button type="primary" size="lg">large</sun-button>
      <sun-button type="primary" size="sm">small</sun-button>
    </div>
    <div style="margin-bottom:24px">
      <p>按钮组</p>
      <sun-button-group>
        <sun-button type="primary">上一页</sun-button>
        <sun-button type="primary">下一页</sun-button>
      </sun-button-group>
    </div>
    <div style="margin-bottom:24px">
      <p>图标</p>
      <sun-icon type="xiangqu" style="margin-right:16px"></sun-icon>会转动的图标：
      <sun-icon type="xiangqu" rotate></sun-icon>
    </div>
    <p>基本输入框</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="6" style="padding-left:0">
        <sun-input v-model="inputText3" placeholder="请输入徐伟涛大大嘴"></sun-input>
        test---- {{inputText3}}
      </sun-col>
    </sun-row>
    <p style="white-space:pre-wrap">输入框组    同时测试可以设置格数span和gutter的流式布局，共24格</p>
    <sun-row :gutter="20" style="margin-bottom:24px">
      <sun-col :span="6">
        <sun-input v-model="inputText" placeholder="请输入内容">
          <template #prepend>Http://</template>
        </sun-input>
        test---- {{inputText}}
      </sun-col>
      <sun-col :span="6">
        <sun-input v-model="inputText1" placeholder="请输入内容">
          <template #append>.com</template>
        </sun-input>
        test---- {{inputText1}}
      </sun-col>
      <sun-col :span="6">
        <sun-input v-model="inputText2" placeholder="请输入内容">
          <template #prepend>Http://</template>
          <template #append>.com</template>
        </sun-input>
        test---- {{inputText2}}
      </sun-col>
    </sun-row>
  </div>
</template>
<script>
import {
  SunButton,
  SunButtonGroup,
  SunIcon,
  SunInput,
  SunRow,
  SunCol
} from "./components";
export default {
  name: "app",
  components: {
    [SunButton.name]: SunButton,
    [SunButtonGroup.name]: SunButtonGroup,
    [SunIcon.name]: SunIcon,
    [SunInput.name]: SunInput,
    [SunRow.name]: SunRow,
    [SunCol.name]: SunCol
  },
  data: function() {
    return {
      type: "info",
      inputText: "",
      inputText1: "",
      inputText2: "",
      inputText3: ""
    };
  },
  methods: {
    switchType() {
      if (this.type === "primary") {
        this.type = "info";
      } else {
        this.type = "primary";
      }
    }
  }
};
</script>
<style lang="scss">
</style>

