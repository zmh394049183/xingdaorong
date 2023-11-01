function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null;
  return function (...args: Parameters<T>): void {
    const context = this;
    const later = () => {
      timeout = null;
      func.apply(context, args);
    };
    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func: (...rest: any[]) => void, wait: number): () => void {
  let pre: number = Date.now();

  return function (...rest) {
    const context = this;

    const now = Date.now();

    if (now - pre >= wait) {
      func.apply(context, rest);
      pre = Date.now();
    }
  };
}

export { debounce, throttle };
