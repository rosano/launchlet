import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguages[0]);
};

describe('LCHLauncherObjectPrompt', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'LPKModePipe',
		}));
	});

	before(function () {
		return browser.OLSKFireKeyboardEvent(browser.window, '.');
	});

	before(function () {
		browser.fill(LCHLauncherPromptDotModeInput, 'alfa');

		browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
	});

	it('hides LCHLauncherObjectPrompt', function() {
		browser.assert.elements(LCHLauncherObjectPrompt, 0);
	});

	context('multi-parametered action', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'w');
		});

		before(function () {
			browser.assert.text(LCHLauncherActionPromptItemSelected, 'Search With'); // #localize
		});

		it('shows LCHLauncherObjectPrompt', function() {
			browser.assert.elements(LCHLauncherObjectPrompt, 1);
		});

		it('localizes LCHLauncherObjectPromptHeading', function() {
			browser.assert.text(LCHLauncherObjectPromptHeading, uLocalized('LCHLauncherObjectPromptHeadingText'));
		});

		it('selects first object', function() {
			browser.assert.text(`${ LCHLauncherObjectPromptItemSelected } .LCHLauncherPipeItemTitle`, 'Wikipedia'); // #localize
		});
	
	});

	context('Tab', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});

		it('sets class', function() {
			browser.assert.hasClass(LCHLauncherObjectPrompt, 'LCHLauncherPromptSelected');
		});
	
	});

	context('Dot', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, '.');
		});

		it('does nothing', function() {
			browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
		});
	
	});

	context('Tab', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});

		it('sets class', function() {
			browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
		});
	
	});

	context('inverse', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'w');
		});

		before(function () {
			browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } .LCHLauncherPipeItemTitle`, 'Wikipedia'); // #localize
		});

		it('shows LCHLauncherObjectPrompt if only one action', function() {
			browser.assert.elements(LCHLauncherObjectPrompt, 1);
		});

		context('Tab', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});
			
			it('focuses LCHLauncherObjectPrompt', async function() {
				browser.assert.hasClass(LCHLauncherObjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('shows LCHLauncherPromptDotModeInput if String', function() {
				browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
				browser.assert.attribute(LCHLauncherPromptDotModeInput, 'autofocus', '');
			});
		
		});
	
	});

});
