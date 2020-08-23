import Watcher from './watcher';

let schedulerQueue = new Set<Watcher>();
const nextSchedulerQueue = new Set<Watcher>();
let isWaiting = true; // 用来记录是否已经有监听器进入更新
let isFlushing = false; // 用来记录任务是否已经开始执行

function flushSchedulerQueue() {
  isFlushing = true;
  schedulerQueue.forEach(watcher => {
    watcher.run();
  });
  if (nextSchedulerQueue.size) {
    schedulerQueue = new Set<Watcher>(nextSchedulerQueue);
    nextSchedulerQueue.clear();
    startTask();
  } else {
    isWaiting = true;
    isFlushing = false;
  }
}

export function queueWatcher(watcher: Watcher) {
  if (!isFlushing) {
    schedulerQueue.add(watcher);
  } else {
    nextSchedulerQueue.add(watcher);
  }
  if (isWaiting) {
    isWaiting = false;
    // 在下个时刻执行，在本时刻收集到所有的依赖变动
    startTask();
  }
}

function startTask() {
  Promise.resolve().then(flushSchedulerQueue);
}