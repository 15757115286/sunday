<template>
  <ul class="sun-select-group__wrap">
    <li class="sun-select-group__title ">
      {{ label }}
    </li>
    <slot />
  </ul>
</template>
<script>
export default {
  name: 'SunOptionGroup',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
};
</script>