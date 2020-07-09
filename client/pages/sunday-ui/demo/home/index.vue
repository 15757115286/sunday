<template>
    <div>
        <div v-for="link in links" :key="link">
            <router-link :to="link" >{{ link }}</router-link>
        </div>
    </div>
</template>
<script>
import { links } from '../../router';
export default {
    name:'demo-home',
    data() {
        return {
            links
        }
    }
}
</script>