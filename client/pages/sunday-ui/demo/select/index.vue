<template>
  <div style="padding:32px; width:100%">
    <p>基本下拉框</p>
    <sun-row>
      <sun-col :span="6" style="margin-bottom:24px">
        <sun-select v-model="value" >
          <sun-option v-for="list in lists" :key="list.value" :lable="list.label" :value="list.value"></sun-option>
        </sun-select>
      </sun-col>
    </sun-row>
     <p>带不可选的下拉框</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="6">
        <sun-select v-model="value1" >
          <sun-option v-for="list in lists1" :key="list.value" :lable="list.label" :value="list.value" :disabled="list.disabled"></sun-option>
        </sun-select>
      </sun-col>
    </sun-row>
     <p>禁用状态</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="6">
        <sun-select v-model="value1" disabled>
          <sun-option v-for="list in lists1" :key="list.value" :lable="list.label" :value="list.value" :disabled="list.disabled"></sun-option>
        </sun-select>
      </sun-col>
    </sun-row>
     <p>可清空单选</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="6">
        <sun-select v-model="value3" clearable>
          <sun-option v-for="list in lists1" :key="list.value" :lable="list.label" :value="list.value" :disabled="list.disabled"></sun-option>
        </sun-select>
      </sun-col>
    </sun-row>
  </div>
</template>
<script>
import { SunSelect, SunOption, SunRow, SunCol } from '../../components';
export default {
  name: 'select-demo',
  components: {
    [SunSelect.name]: SunSelect,
    [SunOption.name]: SunOption,
    [SunCol.name]: SunCol,
    [SunRow.name]: SunRow
  },
  data() {
    return {
      lists: [
        { value: '选项1', label: '奶茶' },
        { value: '选项2', label: '可乐' },
        { value: '选项3', label: '薯片' },
        { value: '选项4', label: '炸鸡' },
        { value: '选项5', label: '汉堡' }
      ],
      lists1: [
        { value: '选项1', label: '奶茶' },
        { value: '选项2', label: '可乐' },
        { value: '选项3', label: '薯片', disabled: true },
        { value: '选项4', label: '炸鸡' },
        { value: '选项5', label: '汉堡' }
      ],
      value: '奶茶',
      value1: '可乐',
      value3: '奶茶'
    };
  }
};
</script>