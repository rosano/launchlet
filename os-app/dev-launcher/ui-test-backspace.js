import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguages[0]);
};

describe('LCHLauncherBackspace', function() {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			runMode: 'LPKModePipe',
		}));
	});

	context('throttle multiple characters', function () {

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});
		
		it('removes trailing character', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
		});
			
		it('shows LCHLauncherSubjectPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
		});
			
		it('shows LCHLauncherActionPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
		});
	
	});

	context('throttle single character', function () {

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});
		
		it('clears filter', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, uLocalized('LCHLauncherSubjectPromptHeadingText'));
		});
			
		it('hides LCHLauncherSubjectPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 0);
		});
			
		it('hides LCHLauncherActionPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 0);
		});
		
		it('shows LCHLauncherSubjectPromptPlaceholder', function() {
			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
		});
	
	});

	context('after throttle', function () {

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
		
		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});
		
		it('clears filter', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, uLocalized('LCHLauncherSubjectPromptHeadingText'));
		});
			
		it('shows LCHLauncherSubjectPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
		});
			
		it('shows LCHLauncherResultList', function() {
			browser.assert.elements(LCHLauncherResultList, 1);
		});
			
		it('shows LCHLauncherActionPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
		});
	
	});

	context('no filter', function() {

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});
			
		it('hides LCHLauncherSubjectPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 0);
		});
			
		it('hides LCHLauncherResultList', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});
			
		it('hides LCHLauncherActionPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 0);
		});
		
		it('shows LCHLauncherSubjectPromptPlaceholder', function() {
			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
		});

	});
	
});