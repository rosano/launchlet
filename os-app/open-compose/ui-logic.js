export const LCHComposeFilterFunction = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return function (e) {
		return [e.LCHDocumentName, e.LCHDocumentSignature].filter(function (e) {
			if (!e) {
				return false;
			}

			return e.toLowerCase().match(inputData.toLowerCase());
		}).length;
	};
};

export const LCHComposeLogicSort = function (a, b) {
	if (a.LCHDocumentModificationDate && b.LCHDocumentModificationDate) {
		return b.LCHDocumentModificationDate - a.LCHDocumentModificationDate;
	}

	return b.LCHDocumentCreationDate - a.LCHDocumentCreationDate;
};

export const LCHComposeLogicValidCompileTokens = function (inputData) {
	return [
		'LCHCompileToken_AppBehaviour',
		'LCHCompileToken_AppStyle',
		'LCHCompileToken_DocumentObjects',
		'LCHCompileToken_AppLanguageCode',
		'LCHCompileToken_LCHLauncherMode',
		];
};

export const LCHComposeLogicBoomarkletTemplate = function () {
	let _protectFromCompiler = console.log;

	window.LCHBookmarklet = {
		uiStyle: function () {
			return _protectFromCompiler(`LCHCompileToken_AppStyle`);
		},
		uiBehaviour: function () {
			_protectFromCompiler(`LCHCompileToken_AppBehaviour`);

			return Main;
		},
		instanceCreate: function () {
			if (window.LCHBookmarklet.AppInstance) {
				window.LCHBookmarklet.instanceDestroy();
			}

			let sandboxContainer = document.createElement('div');
			sandboxContainer.className = 'ProofSvelteBookmarketSandbox'
			document.body.appendChild(sandboxContainer);
			
			sandboxContainer.appendChild(document.createElement('style')).innerHTML = window.LCHBookmarklet.uiStyle();
			
			window.LCHBookmarklet.AppInstance = new (window.LCHBookmarklet.uiBehaviour())({
				target: sandboxContainer,
				props: {
					dataObjects: _protectFromCompiler(`LCHCompileToken_DocumentObjects`),
					completionHandler () {
						return window.LCHBookmarklet.instanceDestroy();
					},
					optionsObject: {
						languageCode: 'LCHCompileToken_AppLanguageCode',
					},
				}
			});
		},
		instanceDestroy: function () {
			window.LCHBookmarklet.AppInstance.$destroy();
			
			delete window.LCHBookmarklet.AppInstance;

			[].slice.call(document.querySelectorAll('.ProofSvelteBookmarketSandbox')).forEach((e) => e.remove());
		},
	};

	window.LCHBookmarklet.instanceCreate();
};

export const LCHComposeLogicBoomarkletStringFor = function (inputData, OLSK_TESTING) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!OLSK_TESTING && LCHComposeLogicValidCompileTokens().filter(function (e) {
		return typeof inputData[e] === 'undefined';
	}).length) {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.keys(inputData).reduce(function (coll, item) {
		let itemReplacement = inputData[item];

		if (item === 'LCHCompileToken_DocumentObjects') {
			itemReplacement = `[${ inputData[item].map(_LCHComposeRecipeStub).map(_LCHComposeLogicRecipeJSON) }]`;
		}

		if (item === 'LCHCompileToken_AppStyle') {
			itemReplacement = `\`${ inputData[item] }\``;
		}


		return coll.replace(item,  itemReplacement);
	}, LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2'))
			.replace(`(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':`, '__LIVERELOADSTART__')
			.replace(`/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');`, '__LIVERELOADEND__')
			.replace(/__LIVERELOADSTART__.*__LIVERELOADEND__/, '')
			.replace(`//# sourceMappingURL=ui-behaviour.js.map`, '');
};

import { LCHFormulaModelErrorsFor, LCHFormulaFrom, LCHFormulaTo } from '../_shared/LCHFormula/main.js';

export const _LCHComposeRecipeStub = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const validKeys = Object.keys(LCHFormulaTo(LCHFormulaModelErrorsFor(LCHFormulaFrom(Object.keys(inputData).reduce(function (coll, item) {
		return (coll[item] = Symbol('ForceInvalid')) && coll;
	}, {}))) || {}, 'LCHRecipe'));

	return Object.assign(validKeys.reduce(function (coll, item) {
		coll[item] = LCHFormulaTo(LCHFormulaFrom(inputData), 'LCHRecipe')[item];

		return coll;
	}, {}), inputData.LCHDocumentBody ? {
		LCHRecipeCallback: _LCHClosureString(inputData),
	} : {}, inputData.LCHDocumentOutputTypeCanonicalExampleBody ? {
		LCHRecipeOutputTypeCanonicalExampleCallback: _LCHClosureString({
			LCHDocumentBody: inputData.LCHDocumentOutputTypeCanonicalExampleBody,
		}),
	} : {});
};

export const _LCHClosureString = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (typeof inputData.LCHDocumentBody !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return `function (${ inputData.LCHDocumentArgs || '' }) { ${ inputData.LCHDocumentBody } }`;
};

export const _LCHComposeLogicRecipeJSON = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const outputData = Object.assign({}, inputData);

	if (inputData.LCHRecipeCallback) {
		outputData.LCHRecipeCallback = '__LCHRecipeCallback__';
	};

	if (inputData.LCHRecipeOutputTypeCanonicalExampleCallback) {
		outputData.LCHRecipeOutputTypeCanonicalExampleCallback = '__LCHRecipeOutputTypeCanonicalExampleCallback__';
	};

	return JSON.stringify(outputData).replace('"__LCHRecipeCallback__"', inputData.LCHRecipeCallback).replace('"__LCHRecipeOutputTypeCanonicalExampleCallback__"', inputData.LCHRecipeOutputTypeCanonicalExampleCallback);
};

export const LCHComposeLogicBookmarkletBinaryFor = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return `javascript:(${ encodeURIComponent(inputData) })();`;
};
