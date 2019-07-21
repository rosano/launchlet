(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHCompile = global.LCHCompile || {})));
}(this, (function (exports) { 'use strict';

	//_ LCHModelErrorsForUnwrappedMemberObject

	exports.LCHModelErrorsForUnwrappedMemberObject = function (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputInvalid');
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

		if (inputData.args !== undefined) {
			if (typeof inputData.args !== 'string') {
				errorsHash.args = new Error('LCHErrorNotString');
			}
		}

		return Object.keys(errorsHash).length ? errorsHash : null;
	};

	//_ LCHWrappedMemberObjectFor

	exports.LCHWrappedMemberObjectFor = function (inputData) {
		if (exports.LCHModelErrorsForUnwrappedMemberObject(inputData)) {
			throw new Error('LCHErrorInputInvalid');
		}

		return Object.keys(inputData).reduce(function (coll, e) {
			if (e === 'args') {
				return coll;
			}

			if (e === 'fnbody') {
				return Object.assign(coll, {
					fnclosure: `function (${ inputData.args || '' }) { ${ inputData.fnbody } }`,
				});
			}

			coll[e] = inputData[e];

			return coll;
		}, {});
	};

	//_ LCHValidTokens

	exports.LCHValidTokens = function (inputData) {
		return [
			'LCHToken_AppBehaviour',
			'LCHToken_AppStyle',
			'LCHToken_MemberObjects',
			'LCHToken_AppLanguageCode',
			];
	};

	//_ LCHBoomarkletTemplateNew

	exports.LCHBoomarkletTemplateNew = function () {
		let _protectFromSvelteCompiler = console.log;

		window.bookmarklet = {
			uiStyle: function () {
				return `LCHToken_AppStyle`;
			},
			uiBehaviour: function () {
				_protectFromSvelteCompiler(`LCHToken_AppBehaviour`);

				return Main;
			},
			instanceCreate: function () {
				if (window.bookmarklet.AppInstance) {
					window.bookmarklet.instanceDestroy();
				}

				let sandboxContainer = document.createElement('div');
				sandboxContainer.className = 'ProofSvelteBookmarketSandbox'
				document.body.appendChild(sandboxContainer);

				sandboxContainer.appendChild(document.createElement('style')).innerHTML = window.bookmarklet.uiStyle();
				
				window.bookmarklet.AppInstance = new (window.bookmarklet.uiBehaviour())({
					target: sandboxContainer,
					props: {
						memberObjects: _protectFromSvelteCompiler(`LCHToken_MemberObjects`),
						optionsObject: {
							workflowDidTerminate () {
								return window.bookmarklet.instanceDestroy();
							},
							localizationLanguageCode: 'LCHToken_AppLanguageCode',
						},
					}
				});
			},
			instanceDestroy: function () {
				window.bookmarklet.AppInstance.$destroy();
				
				delete window.bookmarklet.AppInstance;

				[].slice.call(document.querySelectorAll('.ProofSvelteBookmarketSandbox')).forEach((e) => e.remove());
			},
		};

		window.bookmarklet.instanceCreate()
	};

	//_ LCHBookmarkletStringFor

	exports.LCHBookmarkletStringFor = function (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputInvalid');
		}

		if (Object.keys(inputData).filter(function (e) {
			return exports.LCHValidTokens().indexOf(e) === -1;
		}).length) {
			throw new Error('LCHErrorInputInvalid');
		}

		return Object.keys(inputData).reduce(function (coll, item) {
			return coll.replace(item, item === 'LCHToken_MemberObjects' ? exports._LCHTokenMemberObjectsReplacementFor(inputData[item]) : inputData[item]);
		}, exports.LCHBoomarkletTemplateNew.toString().replace(/_protectFromSvelteCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2')).replace(`(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':5000/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');`, '');
	};

	//_ _LCHTokenMemberObjectsReplacementFor

	exports._LCHTokenMemberObjectsReplacementFor = function (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('LCHErrorInputInvalid');
		}

		let tokenHash = {};

		let outputData = JSON.stringify(inputData.map(function (e) {
			return Object.keys(e).reduce(function (coll, key) {
				if (key === 'fnclosure') {
					key = `__LCHMemberObjectClosure_${ e.id }__`;

					tokenHash[key] = e.fnclosure;

					return Object.assign(coll, {
						fn: `__LCHClosureOpen__${ key }__LCHClosureClose__`,
					});
				}

				coll[key] = e[key];

				return coll;
			}, {});
		}));
		
		return Object.keys(tokenHash).reduce(function (coll, e) {
			return coll.replace(e, tokenHash[e]);
		}, outputData).replace(/("__LCHClosureOpen__)|(__LCHClosureClose__")/g, '');
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
