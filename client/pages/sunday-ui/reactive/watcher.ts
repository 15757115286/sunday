import Dep from './dep';
import { genWatcherId, isString, pushTarget, popTarget, traverse } from './utils';
import { ReactiveObject, WatcherGetter, WatcherCallback, WatcherOptions } from './types';
import { queueWatcher } from './scheduler';

class Watcher<T = any> {
  id: number;
  deps: Set<Dep>; // 上次依赖收集时候的所有依赖
  newDeps: Set<Dep>; // 本次依赖收集的依赖，和上次的比较。如果本次依赖不包含上次依赖中的某依赖，则依赖方变更时候不需要通知该watcher
  getter: () => T;
  expression: string;
  callback?: WatcherCallback<T>;
  value?: T;
  isComputed: boolean;
  dirty: boolean;
  options: WatcherOptions;
  model: ReactiveObject;

  constructor(obj: ReactiveObject, getter: WatcherGetter<T>, callback?: WatcherCallback<T>, options: WatcherOptions = {}) {
    this.model = obj;
    this.id = genWatcherId();
    this.deps = new Set<Dep>();
    this.newDeps = new Set<Dep>();
    this.callback = callback;
    let expression = '';
    if (isString(getter)) {
      expression = getter;
      getter = () => {
        return obj[expression];
      };
    }
    this.getter = getter;
    this.expression = expression;
    this.options = options;
    const { lazy, isComputed = false } = options;
    // 该watcher使用用于计算属性
    this.isComputed = isComputed;
    if (lazy) {
      this.dirty = true;
      this.value = undefined;
    } else {
      this.value = this.get();
    }
  }

  // 获取依赖的值
  get(): T {
    // 把该监听器置顶，配合进行下一步依赖收集
    pushTarget(this);
    let value;
    try {
      // 进行依赖收集
      value = this.getter.call(this.model);
    } catch (e) {
      console.error(e);
    }
    const { deep } = this.options;
    if (deep === true) {
      // 对属性中的每个值都进行访问，来收集依赖
      traverse(value);
    }
    // 把收集依赖的监听器退至之前的监听器
    popTarget();
    this.cleanDeps();
    return value;
  }

  // 清除无效依赖
  cleanDeps() {
    const { deps, newDeps } = this;
    deps.forEach(dep => {
      if (!newDeps.has(dep)) {
        dep.removeSub(this);
      }
    });
    this.deps = newDeps;
    this.newDeps = new Set<Dep>();
  }

  // 监听器更新
  update() {
    const { lazy, sync } = this.options;
    if (lazy === true) {
      this.dirty = true;
    } else if (sync) {
      this.run();
    } else {
      // 在下个时刻进行更新，这里使用proxy进行依赖收集。如使用splice，数组会触发多次set
      queueWatcher(this);
    }
  }

  // 运行回调函数
  run() {
    const value = this.get();
    const { user } = this.options;
    if (user === true) {
      const oldValue = this.value;
      this.callback!.call(this.model, value, oldValue);
    }
    this.value = value;
  }

  // 从新计算监听器的值
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }

  addDep(dep: Dep) {
    // 添加dep的依赖，用于基于该观察者中有多少依赖项
    // 在计算属性的时候把该依赖项可以直接依赖的watcher
    this.newDeps.add(dep);
    dep.addSub(this);
  }

  // 删除对应依赖
  deleteDep(dep: Dep) {
    this.deps.delete(dep);
  }

  // 销毁所有依赖
  destroy() {
    this.deps.forEach(dep => {
      dep.removeSub(this);
    });
  }

  // 如果某个该watcher是一个计算属性的watcher，那么可以把计算属性
  // 对应的依赖值全部复制到依赖于该属性的watcher。
  depend() {
    this.deps.forEach(dep => dep.depend());
  }
}

function watch<T = any>(ro: ReactiveObject, getter: () => T, cb: (value: T, oldValue?: T) => void, options: WatcherOptions = {}) {
  const settledOptions = {
    lazy: false,
    user: true,
    isComputed: false,
    sync: true
  };
  const watcher = new Watcher(ro, getter, cb, Object.assign(options, settledOptions));
  return function unwatch() {
    watcher.destroy();
  };
}

export {
  watch
};

export default Watcher;