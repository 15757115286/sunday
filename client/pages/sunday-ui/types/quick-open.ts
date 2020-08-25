import Vue, { VueConstructor } from 'vue';
import { VNodeData } from 'vue/types/umd';

export interface IVueComponent extends VueConstructor {
  [key: string]: any;
}

export type IVNodeData = <K extends Vue>(vm: K) => VNodeData | VNodeData;

export interface IQuickOpenOptions {
  component: IVueComponent;
  options?: IVNodeData;
  children?: IQuickOpenOptions[];
}
