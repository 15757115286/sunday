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
    const state = {
      name: 'xwt',
      age: 18,
      job: [1, 2, 3]
    };
    (window as any)._px = Reactive<typeof state>({
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
  },

  methods: {
    changeId() {
      this.id++;
    }
  }
});
</script>