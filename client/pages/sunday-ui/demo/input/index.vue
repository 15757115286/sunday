<template>
  <div style="padding:32px">
    <p>基本输入框</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="6" style="padding-left:0">
        <sun-input v-model="inputText3" placeholder="请输入徐伟涛大大嘴"></sun-input>
      </sun-col>
    </sun-row>
    <p style="white-space:pre-wrap">输入框组    同时测试可以设置格数span和gutter的流式布局，共24格</p>
    <sun-row :gutter="20" style="margin-bottom:24px">
      <sun-col :span="6">
        <sun-input v-model="inputText" placeholder="请输入内容">
          <template #prepend><sun-icon type="xiangqu"></sun-icon></template>
        </sun-input>
      </sun-col>
      <sun-col :span="6">
        <sun-input v-model="inputText1" placeholder="请输入内容">
          <template #append>.com</template>
        </sun-input>
      </sun-col>
      <sun-col :span="6">
        <sun-input v-model="inputText2" placeholder="请输入内容">
          <template #prepend>Http://</template>
          <template #append>.com</template>
        </sun-input>
      </sun-col>
    </sun-row>
    <p>禁用输入框</p>
    <sun-row :gutter="20" style="margin-bottom:24px">
       <sun-col :span="4">
         <sun-input  disabled></sun-input>
       </sun-col>
    </sun-row>
    <p style="white-space:pre-wrap">按钮输入框组</p>
    <sun-row :gutter="20" style="margin-bottom:24px">
      <sun-col :span="6">
        <sun-input v-model="inputText" placeholder="请输入内容">
          <template #prepend><sun-button  @click.native="getSlot">按下我</sun-button></template>
          <template #append>.com</template>
        </sun-input>
      </sun-col>
      <sun-col :span="6">
        <sun-input v-model="inputText1" placeholder="请输入内容">
          <template #append><sun-button>搜索</sun-button></template>
        </sun-input>
      </sun-col>
      <sun-col :span="6">
        <sun-input v-model="inputText1" placeholder="请输入内容">
          <template #prepend><sun-button plain>按钮一</sun-button><sun-button plain>按钮二</sun-button></template>
          <template #append><sun-button plain>搜索</sun-button></template>
        </sun-input>
      </sun-col>
    </sun-row>
     <p style="white-space:pre-wrap">不同尺寸</p>
    <sun-row :gutter="20" style="margin-bottom:24px">
      <sun-col :span="6">
         <sun-input v-model="inputText3" placeholder="请输入徐伟涛大大嘴" size="sm"></sun-input>
      </sun-col>
       <sun-col :span="6">
         <sun-input v-model="inputText3" placeholder="请输入徐伟涛大大嘴" ></sun-input>
      </sun-col>
      <sun-col :span="6">
         <sun-input v-model="inputText3" placeholder="请输入徐伟涛大大嘴" size="lg"></sun-input>
      </sun-col>
    </sun-row>
    <p style="white-space:pre-wrap">带图标</p>
    <sun-row :gutter="20" style="margin-bottom:24px">
       <sun-col :span="6">
         <sun-input v-model="inputText3" placeholder="请输入徐伟涛大大嘴" prefix-icon="jiesuo" ></sun-input>
      </sun-col>
       <sun-col :span="6">
         <sun-input v-model="inputText3" placeholder="请输入徐伟涛大大嘴" suffix-icon="dianping" ></sun-input>
      </sun-col>
       <sun-col :span="6">
         <sun-input v-model="inputText3" placeholder="请输入徐伟涛大大嘴" suffix-icon="kanguo" prefix-icon="jiesuo"></sun-input>
      </sun-col>
    </sun-row>
     <p style="white-space:pre-wrap">可清空</p>
    <sun-row :gutter="20" style="margin-bottom:24px">
       <sun-col :span="6">
         <sun-input v-model="inputText5" placeholder="请输入徐伟涛大大嘴" clearable ></sun-input>
      </sun-col>
    </sun-row>
  </div>
</template>
<script>
import {
  SunInput,
  SunRow,
  SunCol,
  SunButton,
  SunIcon
} from "../../components";
export default {
  name: "input-demo",
  components: {
    [SunInput.name]: SunInput,
    [SunRow.name]: SunRow,
    [SunCol.name]: SunCol,
    [SunButton.name]:SunButton,
    [SunIcon.name]:SunIcon
  },
  data: function() {
    return {
      type: "info",
      inputText: "",
      inputText1: "",
      inputText2: "",
      inputText3: "",
      inputText4: "",
      inputText5:''
    };
  },
  methods:{
    getSlot(){
     console.log(this.$refs.nihao)
    }
  }
};
</script>

