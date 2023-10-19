import { deleteFolder } from "../utils/index";
export function rollupDelete(src: string) {
  return {
    name: "plugin1",
    buildStart() {
      deleteFolder(src);
    },
  };
}
