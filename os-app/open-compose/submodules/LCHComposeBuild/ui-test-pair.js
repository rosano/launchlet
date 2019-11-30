import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	kStubPublicKeyValid () {
		return `{}`;
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeBuildPair', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('SubmitValid', function testSubmitValid () {
		
		before(async function () {
			browser.click(LCHComposeBuildPairButton)
			await browser.wait({ element: LCHBuildPairExtensionPublicKeyField })
			
			browser.fill(LCHBuildPairExtensionPublicKeyField, kStubPublicKeyValid())
		});
		
		it('posts message', async function() {
			deepEqual(await browser.OLSKMessageAsync(function () {
				browser.click(LCHBuildPairExtensionSubmitButton)
				return browser.wait({ element: LCHBuildPairExtensionDeleteKeyButton })
			}), {
				LBXRequestName: 'DispatchRequestStorePayload',
				LBXRequestEncryptedData: 'LBX_TESTING_REQUEST_DATA',
			});
		});
	
	});

	context('ModelChange', function testModelChange () {
		
		it('posts message with LBXRequestEncryptedData', async function() {
			deepEqual(await browser.OLSKMessageAsync(async function () {
				await browser.check(LCHComposeBuildModePipeEnabledToggle);
				await browser.wait({ element: LCHComposeBuildModePipeEnabledToggle })
			}), {
				LBXRequestName: 'DispatchRequestStorePayload',
				LBXRequestEncryptedData: 'LBX_TESTING_REQUEST_DATA',
			});
		});
	
	});

	context('RemoveKeys', function testRemoveKeys () {
		
		it('posts no message', async function() {
			deepEqual(await browser.OLSKMessageAsync(function () {
				browser.click(LCHBuildPairExtensionDeleteKeyButton)
				return browser.wait({ element: LCHComposeBuildPairButton })
			}), undefined)
		});
	
	});

});
