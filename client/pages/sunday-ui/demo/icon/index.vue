<template>
  <div style="padding:32px">
    <div style="margin-bottom:24px">
      <p>图标</p>
      <sun-icon
        type="xiangqu"
        style="margin-right:16px"
      />会转动的图标：
      <sun-icon
        type="xiangqu"
        rotate
        style="margin-right:16px"
      />
      <sun-icon
        type="zhusu"
        style="margin-right:16px"
      />
      <sun-icon
        type="loading"
        style="margin-right:16px"
      />
      <sun-icon
        type="xinxi"
        style="margin-right:16px"
      />
    </div>
  </div>
</template>
<script>
import {
  SunIcon
} from '../../components';
export default {
  name: 'IconDemo',
  components: {
    [SunIcon.name]: SunIcon
  }
};
</script>
