import { deepEqual } from 'assert';

const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLargeTextContainer: '#LCHLargeTextContainer',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLargeTextAccess', function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {
					return this.api.LCHLargeText('bravo');
				},
			}]),
		}));
	});

	before(function() {
		browser.assert.elements(LCHLargeTextContainer, 0);
	});

	before(function() {
		return browser.fill(LCHLauncherFilterInput, 'alfa');
	});

	before(function() {
		return browser.click(LCHLauncherListItem);
	});

	it('on run', function() {
		browser.assert.elements(LCHLargeTextContainer, 1);
	});

});
