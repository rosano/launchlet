import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherSafety', function () {

	describe('AutomaticRunningOfPageRecipes', function testAutomaticRunningOfPageRecipes () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				LCHOptionIncludePageRecipes: true,
			}));
		});

		before(function () {
			browser.click('.TestRecipeOutput')
		});

		before(function () {
			browser.assert.elements(LCHLauncher, 0)
			browser.assert.input('.TestRecipeOutput', '')
		});

		before(function () {
			browser.evaluate(`window.LCHPageRecipes = [{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {
					document.querySelector('.TestRecipeOutput').value = 'bravo';
				},
				LCHRecipeURLFilter: '*',
				LCHRecipeIsAutomatic: true,
			}]`)
		});

		before(function () {
			return browser.pressButton('.TestLauncherInvoke');
		});

		before(function () {
			return browser.assert.input('.TestRecipeOutput', '')
		});
		
		it('strips LCHRecipeIsAutomatic from LCHPageRecipes', function() {
			browser.assert.input('.TestRecipeOutput', '')
		});

		context('filter', function () {
			
			before(	function () {
				return browser.fill(LCHLauncherFilterInput, 'alfa');
			});

			before(	function() {
				return browser.click(LCHLauncherListItem);
			});
			
			it('runs item', function() {
				browser.assert.input('.TestRecipeOutput', 'bravo')
			});
		
		});

	});

});
