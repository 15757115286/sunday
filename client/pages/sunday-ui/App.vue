<template>
    <div>
        <sun-button></sun-button>
    </div>
</template>
<script>
import { SunButton } from './components';
export default {
    name: 'app',
    components: {
        [SunButton.name]:SunButton
    }
}
</script>
<style lang="scss">
div {
    color: red;
}
</style>

