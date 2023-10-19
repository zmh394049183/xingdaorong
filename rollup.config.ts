import fs from "fs";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { fileURLToPath } from "url";
import { rollupDelete } from "./plugins/delete";
const __dirnameNew = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirnameNew, "packages");
const packageFiles = fs.readdirSync(packagesDir);
function output(path: string) {
  const prePath = `./packages/${path}`;
  const distPath = `${prePath}/dist`;
  const input = [`${prePath}/src/index.ts`];
  return [
    {
      input,
      output: [
        {
          file: `${distPath}/index.mjs`,
          format: "esm",
        },
        {
          file: `${distPath}/index.cjs`,
          format: "cjs",
        },
      ],
      plugins: [typescript({}), terser(), rollupDelete(`${distPath}`)],
    },
    {
      input,
      plugins: [dts()],
      output: {
        format: "esm",
        file: `${prePath}/dist/index.d.ts`,
      },
    },
  ];
}

export default [
  ...(process.env.PKG ? [process.env.PKG] : packageFiles)
    .filter((item) => item != ".DS_Store")
    .map((path) => output(path))
    .flat(),
];
