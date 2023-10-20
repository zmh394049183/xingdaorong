import fs from "fs";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { fileURLToPath } from "url";
import { rollupDelete } from "./src/plugins/delete";
const __dirnameNew = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirnameNew, "packages");
const packageFiles = fs.readdirSync(packagesDir);
function output(npath: string) {
  const prePath = `./packages/${npath}`;
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
      plugins: [
        rollupDelete(`${distPath}`),
        typescript({
          declarationDir: `${distPath}/`,
          declaration: true,
          baseUrl: `${prePath}/`,
          include: [`${prePath}/**/*.ts`],
        }),

        terser(),
      ],
    },
  ];
}

export default [
  ...(process.env.PKG ? [process.env.PKG] : packageFiles)
    .filter((item) => item != ".DS_Store")
    .map((path) => output(path))
    .flat(),
] as any[];
