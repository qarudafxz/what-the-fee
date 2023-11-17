import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import jsonResolver from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import alias from "@rollup/plugin-alias";

export default {
	input: "api/index.ts",
	output: {
		dir: "./dist/bundle.js",
		format: "es",
		inlineDynamicImports: true,
	},
	external: ["node-fetch", "@sentry/node", "cors", "cheerio"],
	plugins: [
		resolve({ preferBuiltins: true }),
		commonjs(),
		jsonResolver(),
		typescript(),
		alias({ entries: [{ find: /^@\/(.*)/, replacement: "api/$1" }] }),
		terser(),
	],
};
