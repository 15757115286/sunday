import Vue, { CreateElement, VNodeChildren } from 'vue';
import type { IVNodeData, IQuickOpenOptions, IVueComponent } from '../../types/quick-open';
import { VNodeData } from 'vue/types/umd';

function create(el: Element, component: IVueComponent, options: IVNodeData, children: IQuickOpenOptions[], resolve: Function, reject: Function) {
  const vm = new Vue({
    el,

    provide: {
      resolve,
      reject
    },

    render(h) {
      const vm = this;
      let data: any = options;
      if (typeof options === 'function') {
        data = options(vm);
      }
      return h(component, data as VNodeData, transformChildren(vm, children, h));
    }
  });

  return vm;
}

function transformChildren<T extends Vue>(vm: T, children: IQuickOpenOptions[], h: CreateElement) {
  return children.map(child => {
    let { component, options, children } = child;
    if (typeof options === 'function') {
      options = options(vm) as any;
    }
    const _children = transformChildren(vm, children || [], h);
    return h(component, (options || {}) as VNodeData, _children as VNodeChildren);
  });
}

export default create;