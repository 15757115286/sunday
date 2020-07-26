<script>
import Demo from './demo';
export default {
  name: 'VueJsx',
  components: {
    [Demo.name]: Demo
  },
  data() {
    return {
      age: 18
    };
  },
  methods: {
    add() {
      this.age++;
    },
    countChange(number) {
      console.log(number);
    }
  },
  render() {
    return (
      <div class="bg" onClick={this.add}>
        <demo judgement="test" onCountChange={this.countChange}></demo>
      </div>
    );
  }
};
</script>
<style lang="scss">
.bg {
  color:red;
}
</style>