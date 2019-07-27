const svelte = require('rollup-plugin-svelte');

const pathPackage = require('path');

const production = !process.env.ROLLUP_WATCH;

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.LCHRollupConfigCustom = global.LCHRollupConfigCustom || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); let mod = {}; Object.assign(exports, mod = {

	LCHRollupGrabContainerSelector (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		let match;

		if (!(match = inputData.trim().match(/^(\.Container) ?{/))) {
			throw new Error('LCHErrorInputInvalid');
		}

		return match[1];
	},

	LCHRollupPrefixSelector (param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		return param2.replace(/\n(.*)\{/g, `\n${ param1 } :global($1) {`).replace(/body|html/g, '').replace(/ \:global\( \)/g, '');
	},
	
	OLSKRollupConfigCustomFor (inputData) {
		inputData.plugins.splice(0, 1, svelte({

			preprocess: {
				style({ content, filename }) {
					return {
						code: mod.LCHRollupPrefixSelector(mod.LCHRollupGrabContainerSelector(content), require('fs').readFileSync(pathPackage.join(__dirname, '../_shared/_external/normalize.css/normalize.css'), 'utf8')) + content,
						map: ''
					};
				},
			},

			// --- COPY PREVIOUS CONFIGURATION ---

			// enable run-time checks when not in production
			dev: !production,

			// extract component CSS into separate file for better performance
			css: function (css) {
				return css.write(pathPackage.join(pathPackage.dirname(inputData.input), '_compiled/ui-style.css'));
			},
		}));

		return inputData;
	},
	
}); })));
