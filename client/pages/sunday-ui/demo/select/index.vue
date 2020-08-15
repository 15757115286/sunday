<template>
  <div style="padding:32px; width:100%">
    <p>基本下拉框</p>
    <sun-row>
      <sun-col
        :span="8"
        style="margin-bottom:24px"
      >
        <sun-select v-model="value">
          <sun-option
            v-for="list in lists"
            :key="list.value"
            :label="list.label"
            :value="list.value"
          />
        </sun-select>
      </sun-col>
    </sun-row>
    <p>带不可选的下拉框</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="8">
        <sun-select v-model="value1">
          <sun-option
            v-for="list in lists1"
            :key="list.value"
            :label="list.label"
            :value="list.value"
            :disabled="list.disabled"
          />
        </sun-select>
      </sun-col>
    </sun-row>
    <p>禁用状态</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="8">
        <sun-select
          v-model="value1"
          disabled
        >
          <sun-option
            v-for="list in lists1"
            :key="list.value"
            :label="list.label"
            :value="list.value"
            :disabled="list.disabled"
          />
        </sun-select>
      </sun-col>
    </sun-row>
    <p>可清空单选</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="8">
        <sun-select
          v-model="value3"
          clearable
        >
          <sun-option
            v-for="list in lists1"
            :key="list.value"
            :label="list.label"
            :value="list.value"
            :disabled="list.disabled"
          />
        </sun-select>
      </sun-col>
    </sun-row>
    <p>自定义条目内容</p>
    <sun-row style="margin-bottom:24px">
      <sun-col :span="8">
        <sun-select
          v-model="value4"
          clearable
        >
          <sun-option
            v-for="list in lists2"
            :key="list.value"
            :label="list.label"
            :value="list.value"
            :disabled="list.disabled"
          >
            <div style="display:flex;justify-content: space-between;">
              {{ list.label }} <span style="font-size:12px;color:#999">{{ list.value }}</span>
            </div>
          </sun-option>
        </sun-select>
      </sun-col>
    </sun-row>
    <p>多选</p>
    <sun-row
      :gutter="12"
      style="margin-bottom:24px"
    >
      <sun-col
        :span="8"
        style="margin-bottom:24px"
      >
        <sun-select
          v-model="value5"
          multiple
        >
          <sun-option
            v-for="list in lists"
            :key="list.value"
            :label="list.label"
            :value="list.value"
          />
        </sun-select>
      </sun-col>
      <sun-col
        :span="8"
        style="margin-bottom:24px"
      >
        <sun-select
          v-model="value6"
          multiple
          collapse-tags
        >
          <sun-option
            v-for="list in lists"
            :key="list.value"
            :label="list.label"
            :value="list.value"
          />
        </sun-select>
      </sun-col>
    </sun-row>
    <p>分组</p>
    <sun-row>
      <sun-col
        :span="8"
        style="margin-bottom:24px"
      >
        <sun-select v-model="value7">
          <sun-option-group
            v-for="option of options"
            :key="option.label"
            :label="option.label"
          >
            <sun-option
              v-for="item of option.lists"
              :key="item.label"
              :label="item.label"
            />
          </sun-option-group>
        </sun-select>
      </sun-col>
    </sun-row>
    <p>搜索</p>
    <sun-row>
      <sun-col
        :span="8"
        style="margin-bottom:24px"
      >
        <sun-select
          v-model="value"
          filterable
        >
          <sun-option
            v-for="list in lists"
            :key="list.value"
            :label="list.label"
            :value="list.value"
          />
        </sun-select>
      </sun-col>
    </sun-row>
    <p>远程搜索</p>
    <sun-row>
      <sun-col
        :span="8"
        style="margin-bottom:24px"
      >
        <sun-select
          v-model="value8"
          remote
          :remote-method="remoteMethod.bind(this)"
          :loading="loading"
        >
          <sun-option
            v-for="list in options1"
            :key="list.value"
            :label="list.label"
            :value="list.value"
          />
        </sun-select>
      </sun-col>
    </sun-row>
  </div>
</template>
<script>
import { SunSelect, SunOption, SunRow, SunCol, SunOptionGroup } from '../../components';
import { traverseVNode } from '../../components/mixins/vnode';
export default {
  name: 'SelectDemo',
  components: {
    [SunSelect.name]: SunSelect,
    [SunOption.name]: SunOption,
    [SunCol.name]: SunCol,
    [SunRow.name]: SunRow,
    [SunOptionGroup.name]: SunOptionGroup
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
      lists2: [
        { value: 'teamilk', label: '奶茶' },
        { value: 'coke', label: '可乐' },
        { value: 'noun', label: '薯片' }
      ],
      value: '奶茶',
      value1: '可乐',
      value3: '奶茶',
      value4: '奶茶',
      value5: ['可乐', '奶茶', '薯片', '汉堡'],
      value6: ['可乐', '奶茶', '薯片'],
      options: [{
        label: '不能吃',
        lists: [
          { value: '选项1', label: '奶茶是不能吃的' },
          { value: '选项2', label: '可乐是不能吃的' }
        ]
      },
      {
        label: '可以吃',
        lists: [
          { value: '选项1', label: '奶茶是可以吃的' },
          { value: '选项2', label: '可乐是可以吃的' },
          { value: '选项3', label: '薯片是可以吃的' },
          { value: '选项4', label: '炸鸡是可以吃的' },
          { value: '选项5', label: '汉堡是可以吃的' }
        ]
      }
      ],
      value7: '',
      value8: '',
      loading: true,
      options1: [], // 远程获取后的列表
      lists11: [ // 模拟远程上的所有内容
        { value: '选项1', label: 'a' },
        { value: '选项2', label: 'v' },
        { value: '选项3', label: '薯片是可以吃的' },
        { value: '选项4', label: '炸鸡是可以吃的' },
        { value: '选项5', label: '汉堡是可以吃的' }
      ]
    };
  },
  mounted() {
    traverseVNode(this.$vnode, {
      SunSelect: console.log
    }, true);
  },
  methods: {
    remoteMethod(query) { // 模拟远程获取数据
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options1 = this.lists11.filter(item => item.label.includes(query));// 设置筛选条件，只返回符合搜索条件的
        }, 500);
      } else { this.options1 = []; }
    }
  }
};
</script>