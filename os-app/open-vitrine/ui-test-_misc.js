import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHVitrine_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute)
	});

	context('LCHVitrine', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(LCHVitrine, 'OLSKCommon')
		});
	
	});

	context('LCHVitrineIdentityLogo', function () {
		
		it('sets role', function () {
			browser.assert.attribute(LCHVitrineIdentityLogo, 'role', 'presentation')
		});
	
	});

	it('sets LCHPageRecipes', function() {
		deepEqual(browser.evaluate('Array.isArray(window.LCHPageRecipes)'), true)
	});

	context('LCHVitrineBrueghel', function () {
		
		it('sets src', function () {
			browser.assert.attribute(LCHVitrineBrueghel, 'src', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath)
		});
	
	});

});
