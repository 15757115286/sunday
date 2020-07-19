<template>
    <div class="demo-container">
        <div class="demo-menu">
            <div v-for="link in links" :key="link">
                <router-link :to="link" >{{ nameMap[link] || link }}</router-link>
            </div>
        </div>
        <div class="demo-content" >
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { links, nameMap } from '../router';
export default {
  name: 'demo-home',
  data() {
    return {
      links,
      nameMap
    };
  }
};
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
