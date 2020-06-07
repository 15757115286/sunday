import { IService, IClass, IServiceInstance } from '../../definitions';
import { getProvides } from './util';
import { PureObject } from '../../../../definitions/common';
import { BaseApplication } from '../../../../definitions/core';
import { BaseContext } from 'koa';

export default function Inject(service: IService) {
    if(!service.__isService) {
        throw new TypeError(`${ service.name || service} is not a service!`);
    }
    return function(target:any, key:string) {
        const controller:IClass = target.constructor!;
        const provides = getProvides(controller);
        provides[key] = service;
    }
}

export function initService(instance:PureObject, controller:IClass, config:{app:BaseApplication, ctx:BaseContext}) {
    const provides = getProvides(controller);
    for(let key in provides) {
        const service = provides[key];
        let serviceInstance:IServiceInstance | null = null;
        Reflect.defineProperty(instance, key, {
            configurable: false,
            enumerable: true,
            set(val) {
                throw new Error(`can not rewrite the property ${ key } which is auto inject!`);
            },
            get() {
                if (serviceInstance === null) {
                    serviceInstance = new service(config);
                }
                return serviceInstance;
            }
        });
    }
}