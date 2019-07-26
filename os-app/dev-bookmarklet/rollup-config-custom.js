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

		if (!(match = inputData.match(/(\.Container\.svelte-\w+) ?{/))) {
			throw new Error('LCHErrorInputInvalid');
		}

		return match[1];
	},
	
	OLSKRollupConfigCustomFor (inputData) {
		return inputData;
	},
	
}); })));
