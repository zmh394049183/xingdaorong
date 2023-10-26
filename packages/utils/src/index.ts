function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
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

function throttle(func: Function, wait: number): () => void {
  let pre: number = Date.now();

  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();

    if (now - pre >= wait) {
      func.apply(context, args);
      pre = Date.now();
    }
  };
}
export { debounce, throttle };
