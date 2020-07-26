import { Vue, Component } from 'vue-property-decorator';
import '../sunday-ui/assets/scss/style.vue.scss';

ff

@Component
export default class App extends Vue {
  name: 'App'
  render() {
    return (
      <div id="content">
        <router-view />
      </div>
    );
  }
}