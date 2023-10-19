import fs from "fs";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { fileURLToPath } from "url";
const __dirnameNew = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirnameNew, "packages");
const packageFiles = fs.readdirSync(packagesDir);

console.log("[ process.env. ] >", process.env.PKG);
function output(path: string) {
  return [
    {
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.js`,
          format: "umd",
          sourcemap: true,
          name: path,
        },
      ],
      plugins: [typescript({}), terser()],
    },
  ];
}

export default [
  ...(process.env.PKG ? [process.env.PKG] : packageFiles)
    .filter((item) => item != ".DS_Store")
    .map((path) => output(path))
    .flat(),
];
