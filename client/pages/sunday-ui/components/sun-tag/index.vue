<script>
import { BUTTON_TYPE_LIST, BUTTON_SIZE_LIST } from '../sun-button/constant';
import { PREFIX } from '../../prefix';
import SunTransition from '../sun-transition';
import SunIcon from '../sun-icon';
export default {
  name: 'SunTag',
  components: {
    [SunIcon.name]: SunIcon,
    [SunTransition.name]: SunTransition
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
    label: {
      type: String,
      default: ''
    },
    size: {
      default: '',
      validator: function(value) {
        return BUTTON_SIZE_LIST.includes(value);
      }
    },
    unanimate: {
      // 关闭动画
      type: Boolean,
      default: false
    },
    afterLeave: Function // 因为在组建销毁后才完成这个，此时事件已经解绑了，不能用事件传递，故用此方法
  },
  data() {
    return {
      close: false
    };
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
    },
    handleAfterLeave() {
      if (typeof this.afterLeave === 'function') {
        this.afterLeave();
      }
    }
  },
  render() {
    const icon = (
      <sun-icon type="roundclosefill" nativeOnClick={this.handleClick} />
    );
    const element = (
      <span class={this.classObject}>
        {this.$slots.default || this.label}
        {this.closable ? icon : null}
      </span>
    );
    if (!this.unanimate) {
      return (
        <sun-transition
          leave-type="flipOutY"
          duration="500"
          afterLeave={this.handleAfterLeave.bind(this)}
        >
          {this.close ? null : element}
        </sun-transition>
      );
    } else {
      return this.close ? null : element;
    }
  }
};
</script>
