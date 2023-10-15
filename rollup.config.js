import * as react from 'react';
import * as reactDom from 'react-dom';
import * as reactIs from 'react-is';

import babel from "@rollup/plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sass from "rollup-plugin-sass";
import sucrase from "@rollup/plugin-sucrase";
import json from "@rollup/plugin-json";
import nodePolyfills from 'rollup-plugin-node-polyfills';

// import 'process/browser';

export default {
  input: "src/index.js", // Change to your entry file
  output: {
    file: "dist/index.umd.js",
    format: "umd", // Output format for browsers
    name: "near-social-vm", // Your library name
    extend: true,
  },
  plugins: [
    nodePolyfills(),
    resolve({
      extensions: [".js", ".ts"],
      // browser: true, // Enable browser-specific resolution
    }), // Resolve third-party dependencies
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
      // namedExports: {
      //   react: Object.keys(react),
      //   "react-dom": Object.keys(reactDom),
      //   "react-is": Object.keys(reactIs),
      // },
    }), // Convert CommonJS modules to ES modules if needed
    json(),
    sucrase({
      exclude: ["node_modules/**"],
      transforms: ["jsx"],
    }), // Compile JSX to JS
    sass(), // Compile SASS to CSS
    babel({
      // Add the Babel plugin
      babelHelpers: "bundled", // Choose the appropriate helper option
      configFile: "./.babelrc", // Specify the Babel configuration file
    }),
    
  ],
  context: "window"
};
