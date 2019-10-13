import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHOptionIncludePageRecipes', function testLCHOptionIncludePageRecipes () {

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
				LCHTestSkipAutomaticLaunch: true,
				LCHOptionIncludePageRecipes: true,
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

describe('LCHPageRecipes', function testLCHPageRecipes () {

	context('defined', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHTestSkipAutomaticLaunch: true,
				LCHOptionMode: 'LCHModePreview',
				LCHOptionIncludePageRecipes: true,
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

		it('shows item', function() {
			browser.assert.elements(LCHLauncherListItem, 3)
		});

		it('sets LCHLauncherPipeItemSource', function() {
			browser.assert.text(LCHLauncherPipeItemSource, 'loc.tests')
		});

	});

	context('not defined', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHTestSkipAutomaticLaunch: true,
				LCHOptionMode: 'LCHModePreview',
				LCHOptionIncludePageRecipes: true,
			}));
		});

		it('posts message', async function() {
			deepEqual(await browser.OLSKMessageAsync(function () {
				return browser.pressButton('.TestLauncherInvoke');
			}), 'LCHPageRecipes');
		});

		it('hides item', function() {
			browser.assert.elements(LCHLauncherListItem, 2)
		});

	});

	context('not defined sent immediately', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHTestSkipAutomaticLaunch: true,
				LCHOptionMode: 'LCHModePreview',
				LCHOptionIncludePageRecipes: true,
			}));
		});

		before(function () {
			browser.evaluate(`window.addEventListener('message', function (event) {
			  if (event.data !== 'LCHPageRecipes') {
			  	return
			  };

			  event.source.postMessage([{
					LCHRecipeProxyName: 'charlie',
					LCHRecipeProxySignature: 'delta',
				}], event.origin);
			}, false);`)
		});

		before(function () {
			return browser.pressButton('.TestLauncherInvoke');
		});

		it('shows item', function() {
			browser.assert.elements(LCHLauncherListItem, 3)
		});

		context('select', function () {

			it('posts message', async function() {
				deepEqual(await browser.OLSKMessageAsync(function () {
					return browser.click('.LCHLauncherResultListItem:last-child');
				}), 'delta');
			});

		});

	});

	context('not defined sent not immediately', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHTestSkipAutomaticLaunch: true,
				LCHOptionMode: 'LCHModePreview',
				LCHOptionIncludePageRecipes: true,
			}));
		});

		before(function () {
			browser.evaluate(`(function() {
				window.addEventListener('message', function (event) {
					if (event.data !== 'LCHPageRecipes') {
						return;
					}

				  setTimeout(function () {
	  	    	event.source.postMessage([{
	  	  			LCHRecipeProxyName: 'alfa',
	  	  			LCHRecipeProxySignature: 'bravo',
	  	  		}], event.origin);
				  }, 100);
				}, false);
			})();`)
		});

		before(function () {
			return browser.pressButton('.TestLauncherInvoke');
		});

		it('hides item', function() {
			browser.assert.elements(LCHLauncherListItem, 2)
		});

	});

});
