import Observer from './observer';
import Dep from './dep';

export interface PureObject {
  [key: string]: any;
}

export interface ReactiveObject extends PureObject {
  __ob__: Observer;
}

export type WatcherGetter<T> = string | (() => T);

export type WatcherCallback<T> = (value: T, oldValue?: T) => void;

export interface WatcherOptions {
  lazy?: boolean;
  user?: boolean;
  sync?: boolean;
  isComputed?: boolean;
  deep?: boolean;
}

export type ProxyOriginal = PureObject | any[];

export interface ReactiveItemRepo {
  [key: string]: ReactiveItem
}

export interface ReactiveItem {
  dep: Dep;
  getter?: Function;
  setter?: Function;
}

export interface ReactiveOptions<T = PureObject> extends PureObject {
  state: T;

  watch?: {
    [key: string]: (this:T, value: any, oldValue: any) => void;
  }

  computed?: {
    [key: string]: (this:T, state: T) => any;
  }
}
