<template>
  <div>
    <button @click="changeId">
      自增
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Reactive from '../../reactive';
import open from '../../components/quick-open';
import Button from '../../components/sun-button/index.vue';
import { watch } from '../../reactive/watcher';
export default Vue.extend({
  name: 'Watch',

  data() {
    return {
      id: 0
    };
  },

  computed: {
    myId(this:any) {
      console.log('get computed');
      return 'my' + this.id;
    }
  },

  watch: {
    myId: {
      handler(val) {
        console.log('watch change ' + val);
      }
    }
  },
  mounted() {
    open({
      component: Button,
      options: {
        on: {
          click() {
            console.log(this, 'click');
          }
        },
        scopedSlots: {
          default: props => '11'
        }
      }
    });
    const state = {
      name: 'xwt',
      can: {
        name: '1',
        age: 2
      },
      age: 18,
      job: [1, 2, 3]
    };
    const px = (window as any)._px = Reactive<typeof state>({
      state,
      computed: {
        myName() {
          console.log('in computed');
          return this.name + '| in computed';
        }
      },
      watch: {
        name(val, oldVal) {
          console.log(val, oldVal);
        },
        myName(val, oldVal) {
          console.log(val, oldVal);
        }
      }
    });
    const un = watch(px as any, () => {
      return (px as typeof state).can.name;
    }, () => {
      console.log('change');
      un();
    });
  },

  methods: {
    changeId() {
      this.id++;
    }
  }
});
</script>