<template>
  <div style="padding:32px">
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
  SunInput,
  SunRow,
  SunCol
} from "../../components";
export default {
  name: "input-demo",
  components: {
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
  }
};
</script>

