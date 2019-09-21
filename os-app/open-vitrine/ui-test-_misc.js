import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

describe('LCHVitrineMisc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath)
	});

	it('sets LCHPageRecipes', function() {
		deepEqual(browser.evaluate('Array.isArray(window.LCHPageRecipes)'), true)
	});

});
