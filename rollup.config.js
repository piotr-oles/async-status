const typescript = require("rollup-plugin-typescript2");
const sourcemap = require("rollup-plugin-sourcemaps");
const cleaner = require("rollup-plugin-cleaner");
const path = require("path");
const process = require("process");

const pkg = require(path.join(process.cwd(), "package.json"));

if (!pkg.main) {
  throw new Error(
    'Missing "main" key in package.json - cannot compile CommonJS module.'
  );
}

if (!pkg.module) {
  throw new Error(
    'Missing "module" key in package.json - cannot compile ES6 module.'
  );
}

export default {
  input: process.cwd() + "/src/index.ts",
  output: [
    {
      file: process.cwd() + "/" + pkg.main,
      format: "cjs",
      exports: "named"
    },
    {
      file: process.cwd() + "/" + pkg.module,
      format: "esm",
      exports: "named"
    }
  ],
  external: Object.keys(
    Object.assign({}, pkg.peerDependencies || {}, pkg.dependencies || {})
  ),
  plugins: [
    cleaner({
      targets: [
        path.dirname(process.cwd() + "/" + pkg.main),
        path.dirname(process.cwd() + "/" + pkg.module)
      ]
    }),
    typescript({
      clean: true,
      tsconfigOverride: {
        include: ["./src/**/*"],
        exclude: ["node_modules", "./test/**/*"]
      }
    }),
    sourcemap()
  ]
};
