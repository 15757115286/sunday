import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
export default class Demo extends Vue {
  name = 'Demo';
  count = 0;

  @Prop({ default: 'judgement', type: String }) judgement: string;

  // @Emit中countChange必须填写。该名字对应父组件中onCountChange
  @Emit('countChange')
  onCountChange(count: number) {
    return count;
  }

  divClick() {
    this.count++;
    this.onCountChange(this.count);
  }

  render() {
    return (
      <div onClick={this.divClick}>
        <p>{this.judgement}</p>
        次数：{this.count}
      </div>
    );
  }
}
