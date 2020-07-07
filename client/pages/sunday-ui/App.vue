<template>
  <div style="padding:32px">
    <div style="margin-bottom:24px">
      <p>基本用法</p>
      <sun-button type="primary">基本按钮</sun-button>
      <sun-button type="primary" plain>朴素按钮</sun-button>
      <sun-button type="primary" round>圆形按钮</sun-button>
      <sun-button type="link">文字按钮</sun-button>
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
import { SunButton } from "./components";
import { SunButtonGroup } from "./components";
export default {
  name: "app",
  components: {
    [SunButton.name]: SunButton,
    [SunButtonGroup.name]: SunButtonGroup
  }
};
</script>
<style lang="scss">
</style>

