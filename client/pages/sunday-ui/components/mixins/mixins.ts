import type Vue from 'vue';

type ProcessFunction<T> = (node: T) => void;
type ProcessFunctionLike<T> = ProcessFunction<T> | ProcessFunction<T>[];
interface TraverseVmOptions<T> {
  [key: string]: ProcessFunctionLike<T>;
}

function isProcessFunction<T>(val: ProcessFunctionLike<T>): val is ProcessFunction<T>[] {
  return Array.isArray(val);
}

export default {
  methods: {
    traverse(parent: Vue, options: TraverseVmOptions<Vue>) {
      if (parent.$children) {
        parent.$children.forEach(child => {
          const { name } = child.$options;
          Object.keys(options).forEach(key => {
            if (key === name) {
              let processes = options[name];
              if (!isProcessFunction(processes)) {
                processes = [processes];
              }
              processes.forEach(process => {
                process(child);
              });
            }
          });
          this.traverse(child, options);
        });
      }
    }
  }
};
