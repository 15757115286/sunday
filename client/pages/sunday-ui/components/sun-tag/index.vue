<template>
    <sun-transition leaveType="flipOutY" duration="500">
        <span v-if="!close" :class="classObject">
            <slot>{{label}}</slot>
            <sun-icon
            v-if="closable"
            @click.native="handleClick"
            type="roundclosefill"></sun-icon>
        </span>
    </sun-transition>
</template>
<script>
import '../../assets/scss/style.vue.scss';
import { BUTTON_TYPE_LIST, BUTTON_SIZE_LIST } from '../sun-button/constant';
import { PREFIX } from '../../prefix';
import SunTransition from '../sun-transition';
import SunIcon from '../sun-icon';
export default {
  name: 'sun-tag',
  components: {
    [SunIcon.name]: SunIcon,
    [SunTransition.name]: SunTransition
  },
  data() {
    return {
      close: false
    };
  },
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: function(value) {
        return BUTTON_TYPE_LIST.includes(value);
      }
    },
    closable: {
      type: Boolean,
      default: false
    },
    label: {},
    size: {
      default: '',
      validator: function(value) {
        return BUTTON_SIZE_LIST.includes(value);
      }
    }
  },
  computed: {
    classObject() {
      return {
        [PREFIX + 'badge']: true,
        [PREFIX + 'badge-' + this.type]: true,
        [PREFIX + 'badge-' + this.size]: this.size
      };
    }
  },
  methods: {
    handleClick() {
      this.close = true;
      this.$emit('close', this.label); // 预设关闭事件
    }
  }
};
</script>