<template>
  <transition
    :name="name"
    :leave-active-class="leaveClassObject"
    :enter-active-class="enterClassObject"
    :duration="duration"
    @after-leave="handle"
  >
    <slot />
  </transition>
</template>
<script>
export default {
  name: 'SunTransition',
  props: {
    enterType: String,
    leaveType: String,
    name: String,
    afterLeave: Function,
    duration: {}
  },
  computed: {
    enterClassObject() {
      return 'animate__animated animate__' + this.enterType;
    },
    leaveClassObject() {
      return 'animate__animated animate__' + this.leaveType;
    }
  },
  methods: {
    handle() {
      if (typeof this.afterLeave === 'function') { this.afterLeave(); }
    }
  }
};
</script>