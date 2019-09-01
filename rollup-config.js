import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import i18n from 'olsk-rollup-i18n';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

import pathPackage from 'path';
import globPackage from 'glob';

export default globPackage.sync(['os-app/**/rollup-start.js'], {
	matchBase: true,
}).filter(function (e) {
	return !e.match(/node_modules|__external/ig);
}).map(function (e, i) {
	let outputFunction = function (inputData) {
		return inputData;
	};

	try {
		outputFunction = require(pathPackage.join(__dirname, pathPackage.dirname(e), 'rollup-config-custom.js')).OLSKRollupConfigCustomFor;
	} catch(e) {
		if (!e.message.match(/Cannot find module .*rollup-config-custom\.js/)) {
			throw e;
		}
	}

	return outputFunction({
		input: pathPackage.join(pathPackage.dirname(e), 'rollup-start.js'),
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'Main',
			file: pathPackage.join(pathPackage.dirname(e), '__compiled/ui-behaviour.js'),
		},
		onwarn: (warning, handler) => {
			if (['a11y-accesskey', 'a11y-autofocus'].indexOf(warning.pluginCode) !== -1) return;

			handler(warning);
		},
		plugins: [
			svelte({
				// enable run-time checks when not in production
				dev: !production,

				// CSS PREPROCESSING
				preprocess: autoPreprocess({ /* options */ }),

				// CSS SEPERATE FILE
				css: function (css) {
					return css.write(pathPackage.join(pathPackage.dirname(e), '__compiled/ui-style.css'));
				},
			}),

			// NPM MODULES
			resolve({
				browser: true
			}),
			commonjs(),

			// I18N
			i18n({
				baseDirectory: 'os-app',
			}),

			// LIVERELOAD
			!production && livereload({
				watch: pathPackage.join(pathPackage.dirname(e), '__compiled'),
				port: 5000 + i,
			}),

			// MINIFY
			production && terser()
		],
	});
});
