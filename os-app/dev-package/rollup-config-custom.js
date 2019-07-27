(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.LCHRollupConfigCustom = global.LCHRollupConfigCustom || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); let mod = {}; Object.assign(exports, mod = {
	
	OLSKRollupConfigCustomFor (inputData) {
		(function SetModuleName() {
			inputData.output.name = 'Launchlet';
		})();

		(function PublishToDistribution() {
			const svelte = require('rollup-plugin-svelte');
			const pathPackage = require('path');
			const production = !process.env.ROLLUP_WATCH;

			inputData.output.file = pathPackage.join(__dirname, '../../dist/launchlet.js');

			inputData.plugins.splice(inputData.plugins.indexOf(inputData.plugins.filter(function (e) {
				return e.name === 'svelte';
			}).pop()), 1, svelte({
				css (css) {
					css.code = require('fs').readFileSync(pathPackage.join(__dirname, '../dev-bookmarklet/_compiled/ui-style.css'), 'utf8').replace('ui-style', 'launchlet');
					return css.write(pathPackage.join(__dirname, '../../dist/launchlet.css'));
				},

				// --- COPY PREVIOUS CONFIGURATION ---

				// enable run-time checks when not in production
				dev: !production,
			}));
		})();

		(function StripLiveReload() {
			let plugins = inputData.plugins.filter(function (e) {
				return e.name !== 'livereload';
			});

			if (plugins.length === inputData.plugins.length) {
				throw new Error('Failed to remove livereload');
			}

			inputData.plugins = plugins;
		})();

		return inputData;
	},
	
}); })));
