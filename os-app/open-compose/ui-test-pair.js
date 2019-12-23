import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Pair', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('LCHComposePairDispatchSubmit', function () {

		before(function () {
			return browser.pressButton('.LCHComposeToolsPairButton');
		});

		before(function () {
			browser.fill('.LCHComposePairKeyField', '{}')
		});
		
		it('posts message', async function() {
			deepEqual(await browser.OLSKMessageAsync(function () {
				browser.pressButton('.LCHComposePairSubmitButton');
			}), {
				LBXRequestName: 'DispatchRequestStorePayload',
				LBXRequestEncryptedData: 'LBX_TESTING_REQUEST_DATA',
			});
		});

		it('sets LCHComposePairClearIsVisible', function () {
			browser.assert.elements('.LCHComposePairClearButton', 1);
		});
	
	});

	context('ReactDocuments', function () {
		
		it('posts message', async function() {
			deepEqual(await browser.OLSKMessageAsync(function () {
				return browser.check('.LCHComposeBuildPipeModeEnabledField');
			}), {
				LBXRequestName: 'DispatchRequestStorePayload',
				LBXRequestEncryptedData: 'LBX_TESTING_REQUEST_DATA',
			});
		});
	
	});

	context('LCHComposePairDispatchClear', function () {
		
		it('posts no message', async function() {
			deepEqual(await browser.OLSKMessageAsync(function () {
				return browser.pressButton('.LCHComposePairClearButton');
			}), undefined)
		});

		it('sets LCHComposePairClearIsVisible', function () {
			browser.assert.elements('.LCHComposePairClearButton', 0);
		});
	
	});

});
