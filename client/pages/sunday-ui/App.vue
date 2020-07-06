<template>
  <div style="padding:32px">
    <div style="margin-bottom:24px">
      <p>基本用法</p>
      <sun-button type="info">基本按钮</sun-button>
      <sun-button type="info" plain>朴素按钮</sun-button>
      <sun-button type="info" round>圆形按钮</sun-button>
    </div>
    <div style="margin-bottom:24px">
      <p>禁用状态</p>
      <sun-button type="info" disabled>基本按钮</sun-button>
      <sun-button type="info" plain disabled>朴素按钮</sun-button>
    </div>
  </div>
</template>
<script>
import { SunButton } from "./components";
export default {
  name: "app",
  components: {
    [SunButton.name]: SunButton
  }
};
</script>
<style lang="scss">
</style>

