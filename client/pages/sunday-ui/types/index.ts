import Vue, { ComponentOptions } from 'vue';
export type CheckForNotNull<T, K> = T extends null | undefined | never ? K : T;
type PureObject = { [_: string]: any };
export type Component<T = PureObject> = ComponentOptions<Vue & T & PureObject>;
type GetReturnType<F extends Function> = F extends (...args: any[]) => infer R ? R : never;
type GetData<T> = T extends Function ? GetReturnType<T> : CheckForNotNull<T, PureObject>;

export type GetComponentThis<T> = Vue & T & PureObject;

export type GetThis<T extends PureObject> =
  T &
  GetData<T['data']>
