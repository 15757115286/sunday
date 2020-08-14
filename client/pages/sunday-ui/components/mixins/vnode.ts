import { VNode } from 'vue';
import { VNodeData } from 'vue/types/umd';

declare module 'vue/types/vue' {
  interface Vue {
    _vnode: VNode;
  }
}

interface TraverseNode {
  tag: string;
  children: Partial<TraverseNode>[],
  data: VNodeData,
  elm: Node,
  context: Vue,
  vnode: VNode,
  parent: VNode,
  componentTag: string;
  componentInstance: Vue;
}

type WatchFunction = (node: Partial<TraverseNode>) => void;

// 此处的调用顺序会倒序的。因为在递归中使用
export function traverseVNode(vnode: VNode, watchers: { [key: string]: WatchFunction }, isComponent = false): Partial<TraverseNode> | null {
  if (!vnode) return null;
  const { componentInstance } = vnode;
  // 证明不是组件
  let componentTag :string | undefined;
  if (componentInstance !== undefined) {
    const { _vnode, $vnode: { tag } } = componentInstance;
    vnode = _vnode;
    componentTag = tag;
  }
  const { children: c, tag, data, elm, context } = vnode;
  const children = c && c.map(child => {
    const cnode = traverseVNode(child as VNode, watchers, isComponent);
    cnode!.parent = vnode;
    return cnode!;
  });
  const node: Partial<TraverseNode> = {
    tag,
    children,
    data,
    elm,
    context,
    vnode
  };
  if (componentTag) {
    const match = componentTag.match(/-(\w+)$/);
    node.componentTag = match ? match[1] : componentTag;
    node.componentInstance = componentInstance;
  }
  process(node, watchers, isComponent);
  return node;
}

function process(node: Partial<TraverseNode>, watchers: { [key: string]: WatchFunction }, isComponent: boolean) {
  if (!watchers || (watchers && typeof watchers !== 'object')) {
    return;
  }
  Object.keys(watchers).forEach(key => {
    const fn = watchers[key];
    if (typeof fn !== 'function') {
      return;
    }
    if ((!isComponent && key !== node.tag) || (isComponent && key !== node.componentTag)) {
      return;
    }
    fn(node);
  });
}