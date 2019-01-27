(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHComposeLogic = global.LCHComposeLogic || {})));
}(this, (function (exports) { 'use strict';

	//_ LCHComposeLogicFilter

	exports.LCHComposeLogicFilter = function (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInvalidInput');
		}

		return function (e) {
			return [].concat([e.name]).concat(e.labels).filter(function (e) {
				if (!e) {
					return false;
				}

				return e.match(inputData);
			}).length > 0;
		};
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
