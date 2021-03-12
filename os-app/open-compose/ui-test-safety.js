const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Safety', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.pressButton('.LCHComposeCreateButton');
	});
	
	context('LCHDocumentCallbackBody', function test_LCHDocumentCallbackBody () {

		context('flagged', function () {
			
			before(function () {
				browser.assert.elements('.LCHComposeDetailFlagAlert', 0);
			});

			before(function () {
				browser.fill('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug', 'eval');
			});

			it('sets LCHDocumentIsFlagged', function() {
				browser.assert.elements('.LCHComposeDetailFlagAlert', 1);
			});
		
		});

		context('syntax error', function () {
			
			before(function () {
				browser.fill('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug', '{');
			});

			it('sets LCHDocumentSyntaxErrorMessage', function() {
				browser.assert.text('.LCHComposeDetailFlagAlert', 'Unexpected token (1:18)');
			});
		
		});

		context('no issue', function () {
			
			before(function () {
				browser.fill('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug', '');
			});

			it('sets LCHDocumentIsFlagged', function() {
				browser.assert.elements('.LCHComposeDetailFlagAlert', 0);
			});
		
		});

	});
	
	context('LCHDocumentCanonicalExampleCallbackBody', function test_LCHDocumentCanonicalExampleCallbackBody () {

		before(function () {
			browser.fill('.LCHComposeDetailFormOutputTypeField', 'Bool');
		});

		context('flagged', function () {
			
			before(function () {
				browser.assert.elements('.LCHComposeDetailFlagAlert', 0);
			});

			before(function () {
				browser.fill('.LCHComposeDetailFormCanonicalExampleCallbackBody .LCHComposeInputFieldDebug', 'eval');
			});

			it('sets LCHDocumentIsFlagged', function() {
				browser.assert.elements('.LCHComposeDetailFlagAlert', 1);
			});
		
		});

		context('syntax error', function () {
			
			before(function () {
				browser.fill('.LCHComposeDetailFormCanonicalExampleCallbackBody .LCHComposeInputFieldDebug', '{');
			});

			it('sets LCHDocumentSyntaxErrorMessage', function() {
				browser.assert.text('.LCHComposeDetailFlagAlert', 'Unexpected token (1:18)');
			});
		
		});

		context('no issue', function () {
			
			before(function () {
				browser.fill('.LCHComposeDetailFormCanonicalExampleCallbackBody .LCHComposeInputFieldDebug', '');
			});

			it('sets LCHDocumentIsFlagged', function() {
				browser.assert.elements('.LCHComposeDetailFlagAlert', 0);
			});
		
		});

	});

	context.skip('flagged', function test_flagged() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.LCHComposeCreateButton');
		});

		before(function () {
			browser.fill('.LCHComposeDetailFormNameField', 'example-1');
		});
		
		context('internal input', function () {

			before(function () {
				browser.assert.elements('.LCHComposeListItemFlagged', 0);
			});

			before(function () {
				return browser.pressButton('.LCHComposeCreateButton');
			});

			before(function () {
				browser.fill('.LCHComposeDetailFormNameField', 'example-2');
				browser.fill('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug', 'eval');
			});

			before(function () {
				return browser.click('.LCHComposeBuildRunLink');
			});

			before(function () {
				return browser.wait({ element: '.LCHLauncherFilterInput' });
			});

			before(function () {
				return browser.fill('.LCHLauncherFilterInput', 'example');
			});

			it('ignores document', function () {
				browser.assert.elements('.OLSKResultsListItem', 1);
			});

			it('flags document', function () {
				browser.assert.elements('.LCHComposeListItemFlagged', 1);
			});
		
		});
		
		context('external input', function () {

			before(function () {
				return browser.pressButton('.LCHComposeCreateButton');
			});

			before(function () {
				browser.assert.elements('.LCHComposeListItemFlagged', 1);
			});

			before(function () {
				browser.fill('.LCHComposeDetailFormNameField', 'example-3');
				browser.fill('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug', 'LCH_TEST_FLAG_ON_BUILD');
			});

			before(function () {
				return browser.click('.LCHComposeBuildRunLink');
			});

			before(function () {
				return browser.wait({ element: '.LCHLauncherFilterInput' });
			});

			before(function () {
				return browser.fill('.LCHLauncherFilterInput', 'example');
			});

			it('ignores document', function () {
				browser.assert.elements('.OLSKResultsListItem', 1);
			});

			it('flags document', function () {
				browser.assert.elements('.OLSKResultsListItem', 2);
			});
		
		});

	});

});
