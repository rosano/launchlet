const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Fund', function () {

	require('OLSKFund/ui-test_template').default({

		kDefaultRoute,

		ParamProject: 'RP_001',
		
		ParamTriggerGate () {
			return browser.pressButton('.LCHComposeCreateButton');
		},

		ParamCreateDocument () {
			return browser.pressButton('.LCHComposeCreateButton');
		},

		async ParamDeleteDocument () {
			await browser.click('.OLSKCollectionItem');

			return browser.OLSKConfirm(function () {
				return browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
			});
		},

		ParamCreateDocumentSync () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		},

	});
	
});
