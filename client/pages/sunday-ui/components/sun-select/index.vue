<template>
  <div>
    <div class="sun-select" @click.stop="toggle">
      <sun-input ref="select" :suffix-icon="suffixIcon" autocomplete="off" readonly :value="value" @input="$emit('input',$event.target.value)"></sun-input>
    </div>
    <transition  name="sun-zoom-in-top">
      <div v-if="drop" class="sun-select-dropdown">
        <div class="poper_arrow"></div>
        <div class="sun-scrollbar">
          <div class="sun-select-dropdown__wrap sun-scrollbar__wrap">
            <ul class="sun-select-dropdown__list">
              <slot></slot>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import '../../assets/scss/style.vue.scss';
import SunInput from '../sun-input';
export default {
  name: 'sun-select',
  components: {
    [SunInput.name]: SunInput
  },
  data () {
    return {
      suffixIcon: 'xiala',
      drop: false
    };
  },
  props: {
    value: {

    }
  },
  methods: {
    toggle () {
      if (this.suffixIcon === 'xiala') {
        this.suffixIcon = 'shouqi';
        this.drop = true;
      } else {
        this.suffixIcon = 'xiala';
        this.drop = false;
      }
    }
  },
  mounted () {
    const vm = this;
    document.addEventListener('click', function () {
      vm.drop = false;
      vm.suffixIcon = 'xiala';
    });
  }
};
</script>
