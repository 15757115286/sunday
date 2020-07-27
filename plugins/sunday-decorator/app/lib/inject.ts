import { IClass, IServiceInstance } from '../../definitions';
import { getProvides } from './util';
import { PureObject } from '@def/common';
import 'reflect-metadata';

// 如果使用reflect-metadata来后去元数据类型，必须在tsconfig中配置如下属性：
// emitDecoratorMetadata:true，@see https://www.tslang.cn/docs/handbook/decorators.html
// 同时必须配合 reflect-metadata 这个库一起使用
export default function Inject(target:any, key:string) {
  const service = Reflect.getMetadata('design:type', target, key);
  if (!service.__isService) {
    throw new TypeError(`${service.name || service} is not a service!`);
  }
  const controller:IClass = target.constructor!;
  const provides = getProvides(controller);
  provides[key] = service;
}

export function initService(instance:PureObject, controller:IClass, config:PureObject) {
  const provides = getProvides(controller);
  for (const key in provides) {
    const Service = provides[key];
    let serviceInstance:IServiceInstance | null = null;
    Reflect.defineProperty(instance, key, {
      configurable: false,
      enumerable: true,
      set() {
        throw new Error(`can not rewrite the property ${key} which is auto inject!`);
      },
      get() {
        if (serviceInstance === null) {
          serviceInstance = new Service(config);
        }
        return serviceInstance;
      }
    });
  }
}