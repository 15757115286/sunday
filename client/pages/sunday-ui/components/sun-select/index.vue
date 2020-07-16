<template>
  <div>
    <div class="sun-select" @click.stop="toggle">
      <sun-input ref="select" :suffix-icon="suffixIcon" autocomplete="off" readonly :value="value" @input="$emit('input',$event.target.value)"></sun-input>
    </div>
    <transition  name="sun-zoom-in-top">
      <div v-if="drop" class="sun-select-dropdown">
        <div class="poper_arrow"></div>
        <sun-scrollbar :max-height="270">
            <ul class="sun-select-dropdown__list">
              <slot></slot>
            </ul>
        </sun-scrollbar>
      </div>
    </transition>
  </div>
</template>
<script>
import '../../assets/scss/style.vue.scss';
import SunInput from '../sun-input';
import SunScrollbar from '../sun-scrollbar';
export default {
  name: 'sun-select',
  components: {
    [SunInput.name]: SunInput,
    [SunScrollbar.name]: SunScrollbar
  },
  data () {
    return {
      suffixIcon: 'xiala',
      drop: false,
      handle: this.handleClick.bind(this)
    };
  },
  provide () {
    return {
      select: this
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
    },
    handleClick () {
      this.drop = false;
      this.suffixIcon = 'xiala';
    }
  },
  mounted () {
    document.addEventListener('click', this.handle);
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handle);
  }
};
</script>
