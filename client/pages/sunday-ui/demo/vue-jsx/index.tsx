import { Vue, Component, Ref } from 'vue-property-decorator';

@Component
export default class DemoHome extends Vue {
  name = 'DemoHome';

  click() {
    console.log(this.name);
    this.name1 = 'cmd';
  }

  name1 = 'xwt';
  @Ref() readonly div1: HTMLDivElement;

  render() {
    return (
      <div onClick={this.click} ref="div1">
        hello,cm {this.name1}
        <img src="/sunday-ui/assets/test.jpg"></img>
        <div value={this.name}>
          <span></span>
        </div>
      </div>
    );
  }

  mounted(): void {
    console.log(this.$refs.div1);
  }
}
