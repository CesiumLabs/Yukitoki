import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import sveltePreprocess from "svelte-preprocess";
import alias from "@rollup/plugin-alias";

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	const toExit = () => server ? server.kill(0) : null;

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
				stdio: ["ignore", "inherit", "inherit"],
				shell: true
			});

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		}
	};
}

export default {
	input: "src/main.js",
	output: {
		sourcemap: true,
		format: "esm",
		name: "app",
		file: "public/build/bundle.js",
		inlineDynamicImports: true
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			},
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: true
			})
		}),
		css({ output: "bundle.css" }),
		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		commonjs(),
		!production && serve(),
		!production && livereload("public"),
		production && terser(),
		alias({
			entries: [
				{ find: "~", replacement: `${__dirname}/src` }
			]
		})
	],
	watch: {
		clearScreen: false
	}
};
