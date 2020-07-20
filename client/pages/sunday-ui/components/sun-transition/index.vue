<template>
    <transition
    :name="name"
    :leave-active-class="leaveClassObject"
    :enter-active-class="enterClassObject"
    :duration="duration"
    >
    <slot></slot>
    </transition>
</template>
<script>
import '../../assets/scss/style.vue.scss';
export default {
  name: 'sun-transition',
  props: {
    enterType: String,
    leaveType: String,
    name: String,
    duration: {}
  },
  computed: {
    enterClassObject() {
      return 'animate__animated animate__' + this.enterType;
    },
    leaveClassObject() {
      return 'animate__animated animate__' + this.leaveType;
    }
  }
};
</script>