(function LCHMochaWrap() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
		return;
	}

	before(function() {
		global.ZDRTestingWrap = require('zerodatawrap')._ZDRWrap({
			ZDRParamLibrary: require('remotestoragejs'),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'launchlet',
				ZDRScopeSchemas: [
					require('./os-app/_shared/LCHDocument/main.js').default,
					require('./os-app/_shared/LCHSetting/main.js').default,
				],
			}],
			ZDRParamDispatchReady: (function () {}),
		});
	});

	beforeEach(async function() {
		return Promise.all((await LCHTestingWrap.App.ZDRStoragePathsRecursive('')).map(LCHTestingWrap.App.ZDRStorageDeleteFile));
	});
})();

(function LCHMochaStubs() {
	Object.entries({

		uStubDocument (inputData = {}) {
			return Object.assign({
				LCHDocumentCallbackArgs: 'bravo',
				LCHDocumentCallbackBody: 'charlie',
			}, inputData);
		},

		StubDocumentObjectValid (inputData = {}) {
			return Object.assign(uStubDocument({
				LCHDocumentID: 'alfa',
				LCHDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
				LCHDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
			}), inputData);
		},

		StubSettingObjectValid (inputData = {}) {
			return Object.assign({
				LCHSettingKey: 'alfa',
				LCHSettingValue: 'bravo',
			}, inputData);
		},

		uStubTwoItems () {
			return [
				{
					LCHRecipeName: 'alfa',
					LCHRecipeCallback: function () {
						return document.getElementById('TestRecipeOutput').value = 'alfa';
					},
				},
				{
					LCHRecipeName: 'bravo',
					LCHRecipeCallback: function () {
						return document.getElementById('TestRecipeOutput').value = 'bravo';
					},
				},
			];
		},

		uStubStringify (inputData) {
			return JSON.stringify(inputData.map(function (e) {
				return Object.assign(e, {
					LCHRecipeCallback: `(${ e.LCHRecipeCallback.toString() })`,
					LCHRecipeIsExcluded: e.LCHRecipeIsExcluded ? `(${ e.LCHRecipeIsExcluded.toString() })` : undefined,
				});
			}));
		},

		uStubStringifyAll (inputData) {
			return JSON.stringify(Object.fromEntries(Object.entries(inputData).map(function (e) {
				if (e[0] === 'LCHOptionRecipes') {
					e[1] = e[1].map(function (e) {
						return Object.assign(e, {
							LCHRecipeCallback: `(${ e.LCHRecipeCallback.toString() })`,
							LCHRecipeIsExcluded: e.LCHRecipeIsExcluded ? `(${ e.LCHRecipeIsExcluded.toString() })` : undefined,
						});
					});
				};
				return e;
			})));
		},

	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
