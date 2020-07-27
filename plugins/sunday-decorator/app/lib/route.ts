import { IClass, RouterItem } from '../../definitions';
import { getControllStore, get } from './util';
import { PureObject } from '@def/common';

type Item = Partial<RouterItem>;
export default function Route(route:string|string[] = '/') {
  return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const constructor: IClass = target.constructor;
    const controllerStore = getControllStore(constructor);
    const routeItems = get<PureObject<Item>>(controllerStore, 'routeItems', {});
    const item = get<Item>(routeItems, propertyKey, { route: [] });
    if (!Array.isArray(route)) {
      route = [route];
    }
    item.route!.push(...route);
    item.action = descriptor.value;
  };
}