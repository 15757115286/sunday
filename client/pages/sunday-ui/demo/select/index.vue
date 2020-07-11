<template>
  <div style="padding:32px; width:100%">
    <sun-row>
      <sun-col :span="6">
        <sun-select v-model="value" >
          <sun-option v-for="list in lists" :key="list.value" :lable="list.label" :value="list.value"></sun-option>
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
  data () {
    return {
      lists: [
        { value: '选项1', label: '奶茶' },
        { value: '选项2', label: '可乐' },
        { value: '选项3', label: '薯片' },
        { value: '选项4', label: '炸鸡' },
        { value: '选项5', label: '汉堡' }
      ],
      value: '奶茶'
    };
  }
};
</script>