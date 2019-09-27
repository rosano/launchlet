import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguages[0]);
};

describe.only('LCHLauncherMisc_Pipe', function testLCHLauncherMisc_Pipe() {	

	describe('Enter', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
			}));
		});

		before(function() {
			browser.assert.input('.TestRecipeOutput', '');	
		});

		it('assert callbacks count 0')

		context('input not valid', function () {
			
			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('runs no callback', function() {
				browser.assert.input('.TestRecipeOutput', '');
			});
		
		});

		context('input valid', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'a');
			});

			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('runs no callback', function() {
				browser.assert.input('.TestRecipeOutput', 'alfa');
			});

			it('hides LCHLauncher', function() {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

	});

	describe('keydown', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
			}));
		});

		before(function () {
			browser.assert.elements(LCHLauncher)
		});

		before(function () {
			return;
			browser.assert.hasFocus('#LCHLauncherTestInputSingleLine')
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
			
		it('stops keydown from bubbling', function() {
			browser.assert.input('#LCHLauncherTestInputSingleLine', '');
		});

	});

	describe('MatchStop', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
			}));
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
			
		before(function() {
			browser.assert.hasNoClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'x');
		});

		it('sets class', function() {
			browser.assert.hasClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
		});

		it('shows LCHLauncherResultList', function() {
			browser.assert.elements(LCHLauncherResultList, 1);
		});

		context('throttle', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'x');
			});

			it('sets filter', function () {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'AXX');
			});

			it('shows LCHLauncherResultList', function() {
				browser.assert.elements(LCHLauncherResultList, 1);
			});
		
		});

		context('after throttle', function () {
			
			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
			});

			it('sets filter', function () {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
			});

			it('sets class', function() {
				browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 0);
			});

			it('hides LCHLauncherResultList', function() {
				browser.assert.elements(LCHLauncherResultList, 0);
			});
		
		});
		
	});

	describe('SubjectContainer', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
			}));
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'd');
		});
			
		before(function() {
			browser.assert.text(LCHLauncherSubjectPromptItemSelected, 'Active Document Focus Elements SubjectContainer');
		});

		it('shows action', function() {
			browser.assert.text(LCHLauncherActionPromptItemSelected, 'Show Contents');
		});

		context('execute', function () {
			
			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('reloads subjects', async function() {
				browser.assert.text(LCHLauncherSubjectPromptItemSelected, 'alfa DOMElement');
			});
		
		});
		
	});

	describe('keydown', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
			}));
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		it('sets LCHLauncherSubjectPromptHeading', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
		});
		
	});

	describe('Backspace', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
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

	describe('Escape', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
			}));
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		before(function() {
			browser.assert.elements(LCHLauncherResultList, 1);
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides LCHLauncherResultList', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides LCHLauncher', function() {
			browser.assert.elements(LCHLauncher, 0);
		});

	});

	context('Tab', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
			}));
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			browser.assert.elements(LCHLauncherResultList, 1);
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});
		
		it('hides open result list', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

	});
	
});

import { LCHLauncherThrottleDuration } from './ui-logic.js';

describe.skip('LCHLauncherMisc_Pipe', function () {

	context('on keydown', function() {
		
		it('does nothing if no match', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, '[');
			await browser.wait({element: LCHLauncherSubjectPromptHeading});
			deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, '[');

			browser.assert.elements(LCHLauncherPipeItem, 0);
		});
		
		it('shows first item if match', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			await browser.wait({element: LCHLauncherSubjectPromptHeading});

			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);

			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
		});
		
		it('hides list', async function() {
			browser.assert.elements(LCHLauncherResultList, 0);
			browser.assert.elements(LCHLauncherResultListItem, 0);
		});

		it('shows list after throttle', async function() {
			await browser.wait({element: LCHLauncherResultList});

			browser.assert.elements(LCHLauncherResultList, 1);
			browser.assert.elements(LCHLauncherResultListItem, 7);
		});

		it('selects first list item', async function() {
			await browser.wait({element: '.LCHLauncherResultListItemSelected'});
			browser.assert.hasClass(`${ LCHLauncherResultListItem }:first-child`, 'LCHLauncherResultListItemSelected');
		});

		it('skips throttle on ArrowDown', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			await browser.wait({element: LCHLauncherPipeItem});

			browser.assert.elements(LCHLauncherPipeItem, 0);

			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			await browser.wait({element: LCHLauncherResultList});
			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
			browser.assert.elements(LCHLauncherResultList, 1);
			browser.assert.elements(LCHLauncherResultListItem, 7);
		});

		it('skips throttle on ArrowUp', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			await browser.wait({element: LCHLauncherPipeItem});

			browser.assert.elements(LCHLauncherPipeItem, 0);

			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			await browser.wait({element: LCHLauncherResultList});
			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
			browser.assert.elements(LCHLauncherResultList, 1);
			browser.assert.elements(LCHLauncherResultListItem, 7);
		});

		it('hides list on Escape', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			await browser.wait({element: LCHLauncherPipeItem});

			browser.assert.elements(LCHLauncherResultList, 0);
		});

		it('shows list on ArrowDown', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			await browser.wait({element: LCHLauncherPipeItem});

			browser.assert.elements(LCHLauncherResultList, 1);
		});

		it('hides list on Escape', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			await browser.wait({element: LCHLauncherPipeItem});

			browser.assert.elements(LCHLauncherResultList, 0);
		});

		it('shows list on ArrowUp', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			await browser.wait({element: LCHLauncherPipeItem});

			browser.assert.elements(LCHLauncherResultList, 1);
		});

		it('clears filter text on subsequent prompts', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			await browser.wait({element: LCHLauncherActionPrompt});

			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			await browser.wait({element: LCHLauncherActionPromptHeading});

			browser.assert.text(LCHLauncherActionPromptHeading, 'A');

			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			await browser.wait({element: LCHLauncherSubjectPrompt});

			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			await browser.wait({element: LCHLauncherSubjectPromptHeading});

			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
			browser.assert.text(LCHLauncherActionPromptHeading, 'Action');
		});

	});

});
