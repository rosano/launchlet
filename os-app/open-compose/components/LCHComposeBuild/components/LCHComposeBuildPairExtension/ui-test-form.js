import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildPairExtensionUIForm', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('SubmitInvalid', function testSubmitInvalid () {
		
		before(function () {
			browser.click(LCHBuildPairExtensionSubmitButton)
			return browser.wait({ elements: LCHBuildPairExtensionErrorAlert })
		});
	
		it('shows LCHBuildPairExtensionErrorAlert', function() {
			browser.assert.elements(LCHBuildPairExtensionErrorAlert, 1);
		});
	
	});

});
