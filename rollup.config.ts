import fs from 'fs';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';
import { clean } from './src/utils';
const prePath = path.resolve(__dirname, 'packages');
const packageFiles = fs.readdirSync(prePath);
const list = process.env.PKG
  ? [process.env.PKG]
  : packageFiles.filter((item) => item != '.DS_Store');
clean(list.map((item) => `${prePath}/${item}/dist`));
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
          format: 'esm',
        },
        {
          file: `${distPath}/index.cjs`,
          format: 'cjs',
        },
      ],
      plugins: [resolve(), typescript({}), commonjs(), terser()],
    },
    {
      input,
      plugins: [dts()],
      output: {
        format: 'esm',
        file: `${prePath}/dist/index.d.ts`,
      },
    },
  ];
}

export default [...list.map((path) => output(path)).flat()] as any[];

const a = 1;
