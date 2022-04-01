// GW-CANVAS: rollup.config.js

import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: "src/main.ts",
    plugins: [nodeResolve(), typescript()],
    output: [
      {
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: true,
      },
    ],
  },
];
