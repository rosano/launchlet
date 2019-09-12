import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	kStubPublicKeyValid () {
		return `uXjrkGqe5WuS7zsTg6Z9DuS8cXLFz38ue+xrFzxrcQJCXtVccCoUFP2qH/AQ
		4qMvxxvqkSYBpRm1R5a4/NdQ5ei8sE8gfZEq7dlcR+gOSv3nnS4/CX1n5Z5m
		8bvFPF0lSZnYQ23xlyjXTaNacmV0IuZbqWd4j9LfdAKq5dvDaoE=`;
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeBuildUIPair', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('SubmitValid', function testSubmitValid () {
		
		before(async function () {
			browser.click(LCHComposeBuildPairButton)
			await browser.wait({ element: LCHBuildPairExtensionPublicKeyField })
			
			browser.fill(LCHBuildPairExtensionPublicKeyField, kStubPublicKeyValid())
		});
		
		it('posts message with LBXPayloadEncryptedData', async function() {
			deepEqual(typeof (await browser.OLSKMessageAsync(function () {
				browser.click(LCHBuildPairExtensionSubmitButton)
				return browser.wait({ element: LCHBuildPairExtensionUnpairButton })
			})).LBXPayloadEncryptedData, 'string')
		});
	
	});

});
