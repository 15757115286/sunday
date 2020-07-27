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
  // 这是一个render()模板
  // render(h) {
  //   return h('div', {
  //     class: 'hhh'
  //   }, [
  //     h('demo',
  //       {
  //         props: {
  //           level: 2
  //         },
  //         scopedSlots: {
  //           default({ text }) {
  //             return h('span', text);
  //           }
  //         }
  //       })]);
  // }

  // jsx
  render() {
    return (<div>
      <demo level={2} scopedSlots={{
        default({ text }) {
          return <span>{text}</span>;
        }
      }}>
      </demo>
    </div>);
  }
};
</script>
