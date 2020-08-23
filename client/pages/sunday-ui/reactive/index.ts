import Observer from './observer';
import Watcher from './watcher';
import { ReactiveOptions } from './types';
import { PureObject } from '../../../types/common';
import Dep from './dep';

export default function Reactive<T extends PureObject>(options: ReactiveOptions<T>) {
  const { state = {}, computed, watch } = options;
  const ob = new Observer(state);
  computed && initComputed<T>(ob, state, computed);
  watch && initWatch<T>(ob, state, watch);
  return ob.get();
}

function initComputed<T>(ob: Observer, state: PureObject, computed: ReactiveOptions<T>['computed']) {
  for (const key in computed) {
    if (state.hasOwnProperty(key)) {
      throw new Error(`key: ${key} in computed is conflict with state!`);
    }
    const watcher = new Watcher(ob.get() as any, computed[key] as any, undefined, {
      user: false,
      lazy: true,
      isComputed: true
    });
    Object.defineProperty(state, key, {
      get() {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value;
      },
      set() {
        throw new Error('cant not assign a value to computed property!');
      },
      enumerable: true,
      configurable: true
    });
  }
}

function initWatch<T>(ob: Observer, state: PureObject, watch: ReactiveOptions<T>['watch']) {
  for (const key in watch) {
    if (!state.hasOwnProperty(key)) {
      throw new Error(`key: ${key} is not present in state!`);
    }
    new Watcher(ob.get() as any, key, watch[key], {
      lazy: false,
      user: true,
      deep: true
    });
  }
}