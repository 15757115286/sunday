<template>
    <div>
        <button @click="click">heff</button>
        <div>hello world 33</div>
    </div>
</template>
<script>
import '../../assets/ui/button.scss';
export default {
    name:'sun-button',
    methods: {
        click() {
            console.log(124);
        }
    }
}
</script>
<style lang="scss" scoped>
div {
    color: green;
}
</style>