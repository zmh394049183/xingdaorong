import fs from 'fs';

export function deleteFolder(path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
export function clean(arr: string[]) {
  arr.forEach((item) => {
    deleteFolder(item);
  });
}
