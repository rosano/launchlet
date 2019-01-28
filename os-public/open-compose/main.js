(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHCompile = global.LCHCompile || {})));
}(this, (function (exports) { 'use strict';

	//_ LCHModelErrorsForUnwrappedMemberObject

	exports.LCHModelErrorsForUnwrappedMemberObject = function (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInvalidInput');
		}

		let errorsHash = {};

		if (typeof inputData.id !== 'string') {
			errorsHash.id = new Error('LCHErrorNotString');
		}

		if (typeof inputData.fnbody !== 'string') {
			errorsHash.fnbody = new Error('LCHErrorNotString');
		}

		if (inputData.name !== undefined) {
			if (typeof inputData.name !== 'string') {
				errorsHash.name = new Error('LCHErrorNotString');
			}
		}

		return Object.keys(errorsHash).length ? errorsHash : null;
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
