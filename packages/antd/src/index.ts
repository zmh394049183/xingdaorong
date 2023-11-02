export function selectFilter<T extends string = string>(value = 'label' as T) {
  return {
    filterOption: (
      input: string,
      option: {
        [k in typeof value]: string;
      },
    ) => {
      return option[value]?.toLowerCase().includes(input.toLowerCase());
    },
    showSearch: true,
  };
}
export function cascaderFilter(value = 'children') {
  return {
    showSearch: {
      filter: (inputValue: string, path: any[]) => {
        return path.some(
          (option) =>
            option[value]?.toLowerCase()?.indexOf(inputValue.toLowerCase()) >
            -1,
        );
      },
      limit: Number.MAX_SAFE_INTEGER,
    },
  };
}
