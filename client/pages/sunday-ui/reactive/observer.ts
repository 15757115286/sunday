import { ProxyOriginal, ReactiveItemRepo } from './types';
import Dep from './dep';
import { isArray, isObject, def } from './utils';

class Observer {
  private proxy?: ProxyOriginal;
  private repo: ReactiveItemRepo;
  private keys: string[]; // 响应项
  // 这个值的主要作用是用在Vue.set中和数组的变更中（常用）。
  // 因为set了一个新的属性，必须要告诉targe的partent重新取target的值。
  // 如果数组中也被push或者pop了一个值，数组的引用是没有变的。需要告诉持有数组
  // 的对象或者数组从新获取该值来达到对应的刷新效果
  // 因为此时target并没有新属性的依赖。所以这里对应这defineReactive中的childOb.depend
  dep: Dep;
  canDirectChange: boolean;
  /**
   *
   * @param obj 响应式原对象
   * @param shallow 是否浅响应式（不涉及递归响应）
   * @param canDirectChange 是否可以直接添加响应式属性（原来Vue的响应项都需要提前列出）
   */
  constructor(obj: ProxyOriginal, shallow = false, canDirectChange = true) {
    const { __ob__ } = obj as any;
    // 如果有对应__ob__，证明对象已经是响应式属性
    if (__ob__) {
      return __ob__;
    }
    this.repo = Object.create(null);
    this.dep = new Dep();
    this.keys = Object.keys(obj);
    this.canDirectChange = canDirectChange;
    this.defineReactive(obj);
    // 遍历迭代
    !shallow && this.traverse(obj);
  }

  traverse(obj: ProxyOriginal) {
    if (isArray(obj)) {
      obj.forEach(val => {
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
    const canDirectChange = this.canDirectChange;
    const parentDep = this.dep;
    const isArr = isArray(obj); // 响应式的对象是否为数组
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
        if (!isArr && dep === undefined) {
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
          dep?.depend(); // eslint-disable-line
          if (childOb) {
            // 用在数组和Vue.set中使用。如果child添加新的属性，就触发依赖于该child的所有watcher
            childOb.dep.depend();
            if (isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value.__ob__?.get() || value;
      },

      set(obj, prop: string, value: any) {
        // 如果是数组，长度的变化不影响变更
        if (isArr && prop === 'length') {
          const oldLength = obj.length;
          obj[prop] = value;
          // 数组长度发生变化，需要触发依赖
          if (value !== oldLength) {
            parentDep.notify();
          }
          return true;
        }
        const isNewProperty = !isArr && !keys.includes(prop);
        if (isNewProperty && !canDirectChange) {
          obj[prop] = obj;
          return true;
        } else {
          keys.push(prop);
        }
        let item = repo[prop];
        if (item === undefined) {
          item = repo[prop] = Object.create(null);
        }
        const { dep, setter } = item;
        const oldValue = obj[prop];
        // 值相同不做依赖触发，不考虑NaN
        if (oldValue === value && !isNewProperty) {
          return true;
        }
        obj[prop] = setter
          ? setter(value)
          : value;

        if (isArr || isNewProperty) {
          parentDep.notify();
        } else {
          dep?.notify(); // eslint-disable-line
        }
        // 让值进行响应式
        observe(value);
        return true;
      },

      deleteProperty(obj, prop: string) {
        const result = delete obj[prop];
        const needNotify = result && (canDirectChange || isArr || keys.includes(prop));
        const dep = repo[prop]?.dep;
        if (!isArr && dep) {
          dep.destroy();
          keys.splice(keys.indexOf(prop), 1);
          delete repo[prop];
        }
        needNotify && parentDep.notify();
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
  if (val?.__ob__) {
    return val.__ob__;
  }
  if (isObject(val) || isArray(val)) {
    return new Observer(val);
  }
  return null;
}

function dependArray(array: any[]) {
  array.forEach(val => {
    val?.__ob__?.dep.depend(); // eslint-disable-line
    if (isArray(val)) {
      dependArray(val);
    }
  });
}

export default Observer;