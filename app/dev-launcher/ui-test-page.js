import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHPageRecipes', function testLCHPageRecipes () {

	context('not enabled', function () {
		
		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHTestSkipAutomaticLaunch: true,
			}));
		});

		before(function () {
			browser.assert.elements(LCHLauncher, 0)

			browser.evaluate(`window.LCHPageRecipes = [{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {}, // #purge-callback
			}]`)

			return browser.pressButton('.TestLauncherInvoke');
		});
			
		before(function () {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('hides item', function() {
			browser.assert.elements(LCHLauncherListItem, 1)
		});
	
	});

	context('enabled', function () {
		
		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHOptionIncludePageRecipes: true,
				LCHTestSkipAutomaticLaunch: true,
			}));
		});

		before(function () {
			browser.assert.elements(LCHLauncher, 0)

			browser.evaluate(`window.LCHPageRecipes = [{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {}, // #purge-callback
			}]`)

			return browser.pressButton('.TestLauncherInvoke');
		});
			
		before(function () {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('shows item', function() {
			browser.assert.elements(LCHLauncherListItem, 2)
		});

		it('sets LCHLauncherPipeItemSource', function() {
			browser.assert.text(LCHLauncherPipeItemSource, 'loc.tests')
		});
	
	});

});
