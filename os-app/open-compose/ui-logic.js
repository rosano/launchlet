(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHComposeLogic = global.LCHComposeLogic || {})));
}(this, (function (exports) { 'use strict';

	//_ LCHComposeLogicFilter

	exports.LCHComposeLogicFilter = function (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		return function (e) {
			return [].concat([e.name]).concat(e.labels).filter(function (e) {
				if (!e) {
					return false;
				}

				return e.match(new RegExp(inputData, 'i'));
			}).length > 0;
		};
	};

	//_ LCHComposeLogicSort

	exports.LCHComposeLogicSort = function (a, b) {
		if (a.LCHMemberModificationDate && b.LCHMemberModificationDate) {
			return b.LCHMemberModificationDate - a.LCHMemberModificationDate;
		}

		return b.LCHMemberCreationDate - a.LCHMemberCreationDate;
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
