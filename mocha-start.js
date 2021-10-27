(function LCHMochaWrap() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
		return;
	}

	before(async function() {
		global.ZDRTestingWrap = await require('zerodatawrap').ZDRWrap({
			ZDRParamLibrary: require('remotestoragejs'),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'launchlet',
				ZDRScopeSchemas: [
					require('./os-app/_shared/LCHDocument/main.js').default,
					require('./os-app/_shared/LCHSetting/main.js').default,
					require('./os-app/_shared/LCHTransport/main.js').default,
				],
			}],
		});
	});

	beforeEach(function() {
		return ZDRTestingWrap.App.ZDRStorageDeleteFolderRecursive('');
	});
})();

(function LCHMochaStubs() {
	Object.entries({

		uStubDocument (inputData = {}) {
			return Object.assign({
				LCHDocumentCallbackArgs: Math.random().toString(),
				LCHDocumentCallbackBody: Math.random().toString(),
			}, inputData);
		},

		StubDocumentObjectValid (inputData = {}) {
			return Object.assign(uStubDocument({
				LCHDocumentID: Math.random().toString(),
				LCHDocumentCreationDate: new Date(),
				LCHDocumentModificationDate: new Date(),
			}), inputData);
		},

		StubSettingObjectValid (inputData = {}) {
			return Object.assign({
				LCHSettingKey: Math.random().toString(),
				LCHSettingValue: Math.random().toString(),
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
			})).replace('#', encodeURIComponent('#'));
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
