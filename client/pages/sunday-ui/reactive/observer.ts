import { ProxyOriginal, ReactiveItemRepo } from './types';
import Dep from './dep';
import { isArray, isObject, def } from './utils';

class Observer {
  private proxy?: ProxyOriginal;
  private repo: ReactiveItemRepo;
  private keys: string[]; // 响应项
  // 这个值在vue中有用，在本次小demo中其实没用。
  // 这个值的主要作用是用在Vue.set中和数组的变更中（常用）。
  // 因为set了一个新的属性，必须要告诉targe的partent重新取target的值。
  // 如果数组中也被push或者pop了一个值，数组的引用是没有变的。需要告诉持有数组
  // 的对象或者数组从新获取该值来达到对应的刷新效果
  // 因为此时target并没有新属性的依赖。所以这里对应这defineReactive中的childOb.depend
  dep: Dep;
  constructor(obj: ProxyOriginal, shallow = false) {
    const { __ob__ } = obj as any;
    // 如果有对应__ob__，证明对象已经是响应式属性
    if (__ob__) {
      return __ob__;
    }
    this.repo = Object.create(null);
    this.dep = new Dep();
    this.keys = Object.keys(obj);
    this.defineReactive(obj);
    // 遍历迭代
    !shallow && this.traverse(obj);
  }

  traverse(obj: ProxyOriginal) {
    if (isArray(obj)) {
      obj.forEach((val, index) => {
        observe(val);
      });
    } else {
      for (const key in obj) {
        observe(obj[key]);
      }
    }
  }

  defineReactive(obj: ProxyOriginal) {
    // 已经是响应式属性
    if ((obj as any).__ob__) {
      return;
    }
    const repo = this.repo;
    const keys = this.keys;
    const parentDep = this.dep;
    const proxy = new Proxy<ProxyOriginal>(obj, {
      get(obj, prop: string) {
        // 不是响应项
        if (keys.indexOf(prop) === -1) {
          return obj[prop];
        }
        let item = repo[prop];
        if (item === undefined) {
          repo[prop] = item = Object.create(null);
        }
        let value;
        let { getter, dep } = item;
        if (!isArray(obj) && dep === undefined) {
          dep = item.dep = new Dep();
        }
        // 如果是getter，必须重新估值
        if (getter) {
          value = getter();
        } else {
          value = obj[prop];
        }
        // 这里如果已经是响应式的值，不会再次进行对象响应式
        const childOb = observe(value); // 给子属性建立响应式。
        if (Dep.target) {
          dep && dep.depend();
          if (childOb) {
            // 用在数组和Vue.set中使用
            childOb.dep.depend();
            if (isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value.__ob__
          ? value.__ob__.get()
          : value;
      },

      set(obj, prop: string, value: any) {
        // 如果是数组，长度的变化不影响变更
        if (isArray(obj) && prop === 'length') {
          const oldLength = obj.length;
          obj[prop] = value;
          // 数组长度发生变化，需要触发依赖
          if (length !== oldLength) {
            parentDep.notify();
          }
          return true;
        }
        let item = repo[prop];
        if (item === undefined) {
          item = repo[prop] = Object.create(null);
        }
        const { dep, setter } = item;
        const oldValue = obj[prop];
        // 值相同不做依赖触发，不考虑NaN
        if (oldValue === value) {
          return true;
        }
        obj[prop] = setter
          ? setter(value)
          : value;

        if (isArray(obj)) {
          parentDep.notify();
        } else {
          dep && dep.notify();
        }
        // 让值进行响应式
        observe(value);
        return true;
      },

      deleteProperty(obj, prop: string) {
        const result = delete obj[prop];
        if (result) {
          parentDep.notify();
        }
        return result;
      }
    });
    def(obj, '__ob__', this);
    this.proxy = proxy;
  }

  get() {
    return this.proxy;
  }
}

function observe(val: any) {
  if (val && val.__ob__) {
    return val.__ob__;
  }
  if (isObject(val) || isArray(val)) {
    return new Observer(val);
  }
  return null;
}

function dependArray(array: any[]) {
  array.forEach(val => {
    val && val.__ob__ && val.__ob__.dep.depend();
    if (isArray(val)) {
      dependArray(val);
    }
  });
}

export default Observer;