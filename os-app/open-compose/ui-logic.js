(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHComposeLogic = global.LCHComposeLogic || {})));
}(this, (function (exports) { 'use strict';

	//_ LCHComposeLogicSort

	exports.LCHComposeLogicSort = function (a, b) {
		if (a.LCHMemberModificationDate && b.LCHMemberModificationDate) {
			return b.LCHMemberModificationDate - a.LCHMemberModificationDate;
		}

		return b.LCHMemberCreationDate - a.LCHMemberCreationDate;
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
