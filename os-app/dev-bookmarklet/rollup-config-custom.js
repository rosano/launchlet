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
		return inputData;
	},
	
}); })));
