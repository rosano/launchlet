(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.RCSLaunchletLogic = global.RCSLaunchletLogic || {})));
}(this, (function (exports) { 'use strict';

	//_ RCSLaunchletLogicFilter

	exports.RCSLaunchletLogicFilter = function (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('RCSErrorInvalidInput');
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
