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
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('SubmitValid', function testSubmitValid () {
		
		before(async function () {
			browser.click(LCHComposeBuildPairButton)
			await browser.wait({ element: LCHBuildPairExtensionPublicKeyField })
			
			browser.fill(LCHBuildPairExtensionPublicKeyField, kStubPublicKeyValid())
		});
		
		it('posts message with LBXRequestEncryptedData', async function() {
			deepEqual(typeof (await browser.OLSKMessageAsync(function () {
				browser.click(LCHBuildPairExtensionSubmitButton)
				return browser.wait({ element: LCHBuildPairExtensionDeleteKeyButton })
			})).LBXRequestEncryptedData, 'string')
		});
	
	});

	context('ModelChange', function testModelChange () {
		
		it('posts message with LBXRequestEncryptedData', async function() {
			deepEqual(typeof (await browser.OLSKMessageAsync(async function () {
				await browser.check(LCHComposeBuildModePipeEnabledToggle);
				await browser.wait({ element: LCHComposeBuildModePipeEnabledToggle })
			})).LBXRequestEncryptedData, 'string')
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
