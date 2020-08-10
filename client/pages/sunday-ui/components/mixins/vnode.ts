import { VNode as _VNode } from 'vue';
import { VNodeData } from 'vue/types/umd';

type VNode = _VNode & {
  componentInstance: {
    _vnode: VNode;
  }
}

interface TraverseNode {
  tag: string;
  children?: VNode[],
  data: VNodeData,
  elm: Node,
  context: Vue,
  vnode: VNode,
  parent?: VNode
}

type WatchFunction = (node: TraverseNode) => void;

// 此处的调用顺序会倒序的。因为在递归中使用
export function traverseVNode(vnode: VNode, watchers): TraverseNode | null {
  if (!vnode) return null;
  const { componentInstance } = vnode;
  // 证明不是组件
  if (componentInstance !== undefined) {
    vnode = componentInstance._vnode;
  }
  const { children: c, tag, data, elm, context } = vnode;
  const children = c && c.map(child => {
    const cnode = traverseVNode(child as VNode, watchers);
    cnode!.parent = vnode;
    return cnode;
  });
  const node = {
    tag,
    children,
    data,
    elm,
    context,
    vnode
  } as TraverseNode;
  process(node, watchers);
  return node;
}

function process(node: TraverseNode, watchers: { [key: string]: WatchFunction }) {
  if (!watchers || (watchers && typeof watchers !== 'object')) {
    return;
  }
  Object.keys(watchers).forEach(key => {
    const fn = watchers[key];
    if (key !== node.tag || typeof fn !== 'function') {
      return;
    }
    fn(node);
  });
}