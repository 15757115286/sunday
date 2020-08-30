import { genDepId } from './utils';
import Watcher from './watcher';

class Dep {
  id: number;
  subs: Set<Watcher>;

  constructor() {
    this.id = genDepId();
    this.subs = new Set<Watcher>();
  }

  addSub(watcher: Watcher) {
    this.subs.add(watcher);
  }

  removeSub(watcher: Watcher) {
    this.subs.delete(watcher);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  // 当依赖被删除时候
  destroy() {
    this.subs.forEach(watcher => {
      watcher.deleteDep(this);
    });
  }

  notify() {
    // 这里需要一个副本，防止后续更新过程中新增的依赖马上进行修改
    const subs = [...this.subs];
    subs.forEach(watcher => watcher.update());
  }

  static target: Watcher | undefined;
}

export default Dep;