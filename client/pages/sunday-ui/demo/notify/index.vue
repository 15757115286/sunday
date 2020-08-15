<template>
  <div>
    <sun-button @click="click">
      点击
    </sun-button>
  </div>
</template>
<script>
import { notify } from '../../components/sun-notify';
import SunButton from '../../components/sun-button';
export default {
  name: 'SunNotifyDemo',
  components: {
    [SunButton.name]: SunButton
  },
  data() {
    return {
      index: 0
    };
  },
  methods: {
    click() {
      notify('hello' + this.index++, 3000);
    }
  }
};
</script>