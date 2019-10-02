export const LCHBuildFunctionString = function(param1, param2 = '') {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return `function (${ param2 }) { ${ param1 } }`;
};

export const LCHBuildConvertDocumentFunctions = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	return Object.keys(inputData).reduce(function (coll, item) {
		if (item.match('LCHDocumentCallback')) {
			coll.LCHDocumentCallback = LCHBuildFunctionString(inputData.LCHDocumentCallbackBody, inputData.LCHDocumentCallbackArgs);
		} else if (item === 'LCHDocumentCanonicalExampleCallbackBody') {
			coll.LCHDocumentCanonicalExampleCallback = LCHBuildFunctionString(inputData.LCHDocumentCanonicalExampleCallbackBody);
		} else  {
			coll[item] = inputData[item];
		}

		return coll;
	}, {});
};

export const LCHBuildObjectString = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	let substitutions = {};

	const outputData = Object.keys(inputData).reduce(function (coll, item) {
		if (typeof inputData[item] === 'string' && inputData[item].indexOf('function') === 0) {
			coll[item] = `__${ item }__`;

			substitutions[item] = inputData[item];
		}

		if (!coll[item]) {
			coll[item] = inputData[item];
		};

		return coll;
	}, {});

	return Object.keys(substitutions).reduce(function (coll, item) {
		return coll.replace(`"__${ item }__"`, substitutions[item]);
	}, JSON.stringify(outputData));
};

import { LCHFormulaFrom, LCHFormulaTo } from '../../../_shared/LCHFormula/main.js';

export const LCHBuildRecipeArrayString = function (inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	return `[${ inputData.map(LCHBuildConvertDocumentFunctions).map(function (e) {
		Object.keys(e).forEach(function (key) {
			if ([
				'@context',
				'LCHDocumentID',
				'LCHDocumentCreationDate',
				'LCHDocumentModificationDate',
				'LCHDocumentIsFlagged',
				].indexOf(key) !== -1) {
				delete e[key]
			};
		})
		return LCHFormulaTo(LCHFormulaFrom(e), 'LCHRecipe');
	}).map(LCHBuildObjectString).join(',') }]`;
};

export const LCHBuildStripLivereload = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return inputData.split(`(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':`).join('__LIVERELOADSTART__').split(`/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)`).join('').split(`})(document, 'script');`).join('__LIVERELOADEND__').replace(/__LIVERELOADSTART__[\d;]+__LIVERELOADEND__/g, '');
};

export const LCHBuildStripSourceMap = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return Array.from(inputData.match(/\/\/\# sourceMappingURL=[\w-\.]+\.map/g) || []).reduce(function (coll, item) {
		return coll.split(item).join('');
	}, inputData);
};

export const LCHBuildBoomarkletTemplate = function () {
	return `(function () {
    LCHBuildBoomarkletTemplate_Script;

    Launchlet.LRTSingletonCreate(Object.assign(LCHBuildBoomarkletTemplate_Options, {
      LRTOptionRecipes: LCHBuildBoomarkletTemplate_Recipes,
    }));
  })()`;
};
