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

	//_ LCHLogicFilter

	exports.LCHLogicFilter = function (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInvalidInput');
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

	//_ LCHWrappedMemberObjectFor

	exports.LCHWrappedMemberObjectFor = function (inputData) {
		if (exports.LCHModelErrorsForUnwrappedMemberObject(inputData)) {
			throw new Error('LCHErrorInvalidInput');
		}

		return Object.keys(inputData).reduce(function (coll, e) {
			if (e === 'fnbody') {
				return Object.assign(coll, {
					fnclosure: `function () { ${inputData.fnbody} }`,
				});
			}

			coll[e] = inputData[e];

			return coll;
		}, {});
	};

	//_ LCHBoomarkletTemplate

	exports.LCHBoomarkletTemplate = function () {
		const api = {
			functionObjects: function () {
				return [

				].concat(__LCHTokenMemberObjects__);
			},
			actionObjects: function () {
				return api.functionObjects().filter(function (e) {
					return !!e.name;
				});
			},
			fn: function (inputData) {
				if (typeof inputData !== 'string') {
					throw new Error('LCHBookmarkletErrorIdentifierNotString');
				}

				if (inputData === '') {
					throw new Error('LCHBookmarkletErrorIdentifierBlank');
				}

				if (inputData.trim() !== inputData) {
					throw new Error('LCHBookmarkletErrorIdentifierContainsUntrimmedWhitespace');
				}

				let functionObject = api.functionObjects().filter(function (e) {
					return e.id === inputData;
				}).shift();

				if (!functionObject) {
					throw new Error('LCHBookmarkletErrorIdentifierNotDefined');
				}

				return functionObject.fn.bind({
					api: api,
				});
			},
			lib: function (inputData) {
				return api.fn(inputData)();
			},
		};

		api.fn('LCHLifecycleInitialize')();
	};

	//_ LCHUnescapedBookmarkletForWrappedMemberObjects

	exports.LCHUnescapedBookmarkletForWrappedMemberObjects = function (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('LCHErrorInvalidInput');
		}

		return exports.LCHBoomarkletTemplate.toString().replace('__LCHTokenMemberObjects__', JSON.stringify(inputData.map(function (memberObject) {
			return Object.keys(memberObject).reduce(function (coll, e) {
				if (e === 'fnclosure') {
					return Object.assign(coll, {
						fn: `__LCHClosureOpen__${ memberObject.fnclosure }__LCHClosureClose__`,
					});
				}

				coll[e] = memberObject[e];

				return coll;
			}, {});
		})).replace(/("__LCHClosureOpen__)|(__LCHClosureClose__")/g, ''));
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
