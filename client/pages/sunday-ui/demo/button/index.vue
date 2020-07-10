<template>
  <div style="padding:32px">
    <div style="margin-bottom:24px">
      <p>基本用法</p>
      <div style="margin-bottom:12px">
        <sun-button type="primary" >基本按钮</sun-button>
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
  </div>
</template>
<script>
import {
  SunButton,
  SunButtonGroup,
  SunIcon,
} from "../../components";
export default {
  name: "button-demo",
  components: {
    [SunButton.name]: SunButton,
    [SunButtonGroup.name]: SunButtonGroup,
    [SunIcon.name]: SunIcon,
  },
  data: function() {
    return {
      type: "info"
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

