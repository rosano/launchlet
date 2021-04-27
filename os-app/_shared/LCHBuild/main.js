import LCHFormula from '../LCHFormula/main.js';

const mod = {

	LCHBuildFunctionString(param1, param2 = '') {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return `function (${ param2 }) { ${ param1 } }`;
	},

	LCHBuildConvertDocumentFunctions (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		return Object.keys(inputData).reduce(function (coll, item) {
			if (item.match('LCHDocumentCallback')) {
				coll.LCHDocumentCallback = mod.LCHBuildFunctionString(inputData.LCHDocumentCallbackBody, inputData.LCHDocumentCallbackArgs);
			} else if (item === 'LCHDocumentCanonicalExampleCallbackBody') {
				coll.LCHDocumentCanonicalExampleCallback = mod.LCHBuildFunctionString(inputData.LCHDocumentCanonicalExampleCallbackBody);
			} else  {
				coll[item] = inputData[item];
			}

			return coll;
		}, {});
	},

	LCHBuildObjectString (inputData) {
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
			}

			return coll;
		}, {});

		return Object.keys(substitutions).reduce(function (coll, item) {
			return coll.replace(`"__${ item }__"`, substitutions[item]);
		}, JSON.stringify(outputData));
	},

	LCHBuildRecipeArrayString (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		return `[${ inputData.map(mod.LCHBuildConvertDocumentFunctions).map(function (e) {
			Object.keys(e).forEach(function (key) {
				if ([
					'@context',
					'LCHDocumentID',
					'LCHDocumentCreationDate',
					'LCHDocumentModificationDate',
					'LCHDocumentIsFlagged',
				].includes(key)) {
					delete e[key];
				}
			});
			return LCHFormula.LCHFormulaTo(LCHFormula.LCHFormulaFrom(e), 'LCHRecipe');
		}).map(mod.LCHBuildObjectString).join(',') }]`;
	},

	LCHBuildStripSourceMap (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return Array.from(inputData.match(/\/\/\# sourceMappingURL=[\w-\.]+\.map/g) || []).reduce(function (coll, item) {
			return coll.split(item).join('');
		}, inputData);
	},

	LCHBuildBoomarkletTemplate () {
		return `(function () {
	    LCHBuildBoomarkletTemplate_Script;

	    Launchlet.LCHTasksRun([{
	      LCHRecipeCallback () {},
	      LCHRecipeStyle: \`LCHBuildBoomarkletTemplate_Style\`,
	      LCHRecipeURLFilter: '*',
	      LCHRecipeIsAutomatic: true,
	    }]);

	    Launchlet.LCHSingletonCreate(Object.assign(LCHBuildBoomarkletTemplate_Options, {
	      LCHOptionRecipes: LCHBuildBoomarkletTemplate_Recipes,
	    }));
	  })()`;
	},

	LCHBuildEscape (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return `javascript:${ encodeURIComponent(inputData) }`;
	},

};

export default mod;
