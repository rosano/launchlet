import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherPrompt: '.LCHLauncherPrompt',
	LCHLauncherPromptItemSelected: '.LCHLauncherZoneInput .LCHLauncherPipeItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherPrompt_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows LCHLauncherPrompt', function () {
		browser.assert.elements(LCHLauncherPrompt, 1);
	});

	it('hides LCHLauncherPromptItemSelected', function () {
		browser.assert.elements(LCHLauncherPromptItemSelected, 0);
	});

	it('hides LCHLauncherResultList', function () {
		browser.assert.elements('.LCHLauncherResultList', 0);
	});

	context('set single', function() {

		before(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetPromptItemsSingle');
		});

		it('shows LCHLauncherResultListItem', function () {
			browser.assert.elements('.LCHLauncherResultListItem', 1);
		});
	});
	
	context('set multiple', function() {

		before(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');
		});

		it('shows LCHLauncherResultListItem', function () {
			browser.assert.elements('.LCHLauncherResultListItem', 3);
		});
	});
	
	context('set zero', function() {

		before(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetPromptItemsZero');
		});

		it('hides LCHLauncherResultListItem', function () {
			browser.assert.elements('.LCHLauncherResultListItem', 0);
		});

		after(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');
		})

	});
	
	context('set ResultsHidden', function() {

		before(function () {
			return browser.check('#LCHLauncherPromptTestSetResultsHidden');
		});

		it('hides LCHLauncherResultList', function () {
			browser.assert.elements('.LCHLauncherResultList', 0);
		});

	});
	
	context('set ItemSelected', function() {

		before(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetStubItemSelected');
		});
		
		it('shows LCHLauncherPromptItemSelected', function () {
			browser.assert.elements(LCHLauncherPromptItemSelected, 1);
		});
	});
	
	context('set ItemSelectedHidden', function() {

		before(function () {
			return browser.check('#LCHLauncherPromptTestSetItemSelectedHidden');
		});

		it('hides LCHLauncherPromptItemSelected', function () {
			browser.assert.elements(LCHLauncherPromptItemSelected, 0);
		});
	});

});
