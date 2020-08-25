import create from './create';
import type { IQuickOpenOptions, IVNodeData } from '../../types/quick-open';

function open(quickOptions: IQuickOpenOptions, el?: string | Element | null) {
  const { component, options, children } = quickOptions;
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }
  if (!el) {
    el = document.createElement('div');
    document.body.appendChild(el);
  }
  return new Promise<any>((resolve, reject) => {
    create(el as Element, component, (options || {}) as IVNodeData, children || [], resolve, reject);
  });
}

export default open;