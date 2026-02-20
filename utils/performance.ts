
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let waiting = false;
  let trailingArgs: any[] | null = null;

  const timeoutFunc = () => {
    if (trailingArgs == null) {
      waiting = false;
    } else {
      func(...trailingArgs);
      trailingArgs = null;
      setTimeout(timeoutFunc, limit);
    }
  };

  return function(this: any, ...args: any[]) {
    if (waiting) {
      trailingArgs = args;
      return;
    }

    func.apply(this, args);
    waiting = true;
    setTimeout(timeoutFunc, limit);
  } as T;
}
