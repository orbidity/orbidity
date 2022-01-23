const path = require("path");
const { build } = require("esbuild");
const { NodeModulesPolyfillPlugin } = require("@esbuild-plugins/node-modules-polyfill");

build({
    logLevel: "info",
    entryPoints: [path.resolve(__dirname, "worker.js")],
    bundle: true,
    sourcemap: true,
    watch: process.argv.includes("--watch"),
    platform: "browser",
    target: "esnext",
    outdir: path.resolve(__dirname, "..", "public", "worker"),
    loader: { ".sol": "text" },
    plugins: [NodeModulesPolyfillPlugin()],
});
