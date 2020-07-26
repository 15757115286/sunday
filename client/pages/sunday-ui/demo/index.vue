<template>
  <div class="demo-container">
    <div class="demo-menu">
      <div
        v-for="link in links"
        :key="link"
      >
        <router-link :to="link">
          {{ nameMap[link] || link }}
        </router-link>
      </div>
    </div>
    <div class="demo-content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { links, nameMap } from '../router';

@Component
export default class DemoHome extends Vue {
  name = 'DemoHome';
  data() {
    return {
      links,
      nameMap
    };
  }
}
</script>
<style lang="scss">
.demo-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}
.demo-menu {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 20px;
}
.demo-content {
    display: auto;
    width: 100%;
    display: flex;
}
</style>
