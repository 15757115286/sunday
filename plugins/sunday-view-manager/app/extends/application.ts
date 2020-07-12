import { BaseApplication } from '../../../../definitions/core';
import SundayViewManager from '../lib/SundayViewManager';

let viewManager: SundayViewManager;
export default {
  get view (): SundayViewManager {
    const app = this;
    if (viewManager === undefined) {
      viewManager = new SundayViewManager(app as BaseApplication);
    }
    return viewManager;
  }
};