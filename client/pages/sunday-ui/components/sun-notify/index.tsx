import { Component, GetComponentThis } from '../../types';
import Vue from 'vue';

interface Message {
  msg: string;
  id: number;
}

interface NotifyConfig {
  max?: number;
}

interface NotifyComponent extends Vue {
  notifies: Message[];
}

const NotifyOptions: Component = {
  name: 'SunNotify',
  data() {
    return {
      notifies: []
    };
  },
  render(this: GetComponentThis<NotifyComponent>) {
    return (
      <transition-group tag="ul" name="fade" class="sun-notify-container">
        {this.notifies.map(msg => {
          return (
            <li class="sun-notify-item" key={msg.id}>{msg.msg}</li>
          );
        })}
      </transition-group>
    );
  }
};

let vm: NotifyComponent | null = null;
let id = 0;
let max = 10;

export function notify(messages: string | string[], delay = 1500) {
  if (vm === null) {
    vm = new Vue(NotifyOptions) as NotifyComponent;
    const div = document.createElement('div');
    document.body.appendChild(div);
    vm.$mount(div);
  }
  if (typeof messages === 'string') {
    messages = [messages];
  }
  const notifies = vm.notifies;
  const _messages = messages.map(msg => ({
    id: id++,
    msg
  }));
  notifies.push(..._messages);
  if (notifies.length > max) {
    notifies.splice(0, notifies.length - max);
  }
  if (delay !== 0) {
    setTimeout(() => {
      _messages.forEach(msg => {
        const index = notifies.indexOf(msg);
        index >= 0 && notifies.splice(index, 1);
      });
    }, delay);
  }
}

function setConfig(config:NotifyConfig = {}) {
  max = config.max || 10;
}

export default {
  notify,
  setConfig
};
