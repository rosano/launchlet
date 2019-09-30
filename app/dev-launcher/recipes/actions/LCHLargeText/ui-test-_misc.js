import { deepEqual } from 'assert';

const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLargeText_Misc', function () {

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
		browser.click(LCHLauncherListItem);
	});

	it('sets text', function() {
		browser.assert.text(LCHLargeTextContainer, 'bravo');
	});

	context('click inside', function () {

		before(function () {
			return browser.click(`${ LCHLargeTextContainer } span`);
		});
		
		it('does nothing', function() {
			browser.assert.elements(LCHLargeTextContainer, 1);
		});
	
	});

	context('click outside', function () {

		before(function () {
			return browser.click('.TestRecipeOutput');
		});
		
		it('hides LCHLargeTextContainer', function() {
			browser.assert.elements(LCHLargeTextContainer, 0);
		});
	
	});
		
	context('Keydown', function () {

		before(function () {
			return browser.pressButton('.TestLauncherInvoke');
		});

		before(function() {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		before(function() {
			browser.click(LCHLauncherListItem);
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it.skip('hides LCHLargeTextContainer', function() {
			browser.assert.elements(LCHLargeTextContainer, 0);
		});
	
	});

});
