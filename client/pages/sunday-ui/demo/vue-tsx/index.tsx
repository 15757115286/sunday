import { Vue, Component, Ref } from 'vue-property-decorator';
import Demo from './demo';

@Component({
  components: {
    [Demo.name]: Demo
  }
})
export default class DemoHome extends Vue {
  name = 'VueTsx';

  click() {
    console.log(this.name);
    this.name1 = 'cmd';
  }

  name1 = '';
  @Ref() readonly div1: HTMLDivElement;

  show(count: number) {
    console.log(count);
    this.name1 += `${count}`;
  }

  render() {
    return (
      <div ref="div1">
        hello,cm {this.name1}
        <img src="/sunday-ui/assets/test.jpg" style={{ width: '200px' }}></img>
        <div value={this.name}>
          <demo judgement="xwtcc" onCountChange={this.show}></demo>
        </div>
      </div>
    );
  }

  mounted(): void {
    console.log(this.$refs.div1);
  }
}
