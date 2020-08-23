import Watcher from './watcher';
import Dep from './dep';

let currentDepId = 0;
let currentWatcherId = 0;
const targetStacks: Watcher[] = [];

export function genDepId() {
  return currentDepId++;
}

export function genWatcherId() {
  return currentWatcherId++;
}

export function pushTarget(target: Watcher) {
  targetStacks.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStacks.pop();
  const length = targetStacks.length;
  Dep.target = length
    ? targetStacks[length - 1]
    : undefined;
}

export function isString(val: any): val is string {
  return typeof val === 'string';
}

export function isArray<T = any>(val: any): val is Array<T> {
  return Array.isArray(val);
}

export function isObject(val: any) {
  return ({}).toString.call(val) === '[object Object]';
}

export function noop() {}

export function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    enumerable: false,
    configurable: true
  });
}

const set = new Set<any>();
export function traverse(val: any, depth = 0) {
  if (set.has(val)) {
    return;
  }
  set.add(val);
  // 进行依赖收集
  val && val.__ob__ && val.__ob__.dep.depend();
  if (isObject(val)) {
    for (const key in val) {
      traverse(val[key], depth + 1);
    }
  }
  if (isArray(val)) {
    val.forEach(value => {
      traverse(value, depth + 1);
    });
  }
  if (depth === 0) {
    set.clear();
  }
}