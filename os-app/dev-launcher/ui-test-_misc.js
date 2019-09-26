import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguages[0]);
};

describe('LCHLauncherMiscCommit', function testLCHLauncherMiscCommit() {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			runMode: 'kRunModeCommit',
		}));
	});

	before(function() {
		browser.assert.input('.TestRecipeOutput', '');	
	});

	it('assert callbacks count 0')

	it('shows no items', function() {
		browser.assert.elements(LCHLauncherListItem, 0);
	});

	describe('filter', function () {
		
		context('match', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			it('shows matching items', function() {
				browser.assert.elements(LCHLauncherListItem, 2);
			});

			it('selects first item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
			});

			it('assert callbacks count 0')

			it('runs no callback', function() {
				browser.assert.input('.TestRecipeOutput', '');	
			});
		
		});

		context('match update', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'al');
			});
			
			it('shows matching items', function() {
				browser.assert.elements(LCHLauncherListItem, 1);
			});

			it('assert callbacks count 0')
		
		});
		
		context('no match', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'alb');
			});
			
			it('shows no items', function() {
				browser.assert.elements(LCHLauncherListItem, 0);
			});

			it('assert callbacks count 0')
		
		});

	});

	describe('results', function () {

		before(function() {
			browser.fill(LCHLauncherFilterInput, 'a');
		});

		context('ArrowDown', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('selects next item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');
			});
		
		});

		context('ArrowUp', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			it('selects previous item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
			});
		
		});

		it('sets class on mouseover')
		context.skip('mouseover', function () {

			before(function () {
				return browser.fire(`${ LCHLauncherListItem }:nth-child(2)`, 'mouseover');
			});
			
			it('sets class', function () {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');	
			});
		
		});

		context('click', function () {

			before(function () {
				browser.assert.input('.TestRecipeOutput', '');
			});

			before(function () {
				return browser.fire(`${ LCHLauncherListItem }:nth-child(2)`, 'click');
			});

			it('assert callbacks count 1')
			
			it('runs callback', function () {
				browser.assert.input('.TestRecipeOutput', 'bravo');	
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

		context('Enter', function () {

			before(function () {
				return browser.pressButton('.TestLauncherInvoke');
			});
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('assert callbacks count 2')
			
			it('runs callback', function () {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

		context('Escape filter', function () {

			before(function () {
				return browser.pressButton('.TestLauncherInvoke');
			});
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('clears filter', function() {
				browser.assert.input(LCHLauncherFilterInput, '');
			});
		
		});

		context('Escape no filter', function () {

			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('hides LCHLauncher', function() {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

	});
	
});

describe('LCHLauncherMiscPreview', function testLCHLauncherMiscPreview() {	

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			runMode: 'kRunModePreview',
		}));
	});

	before(function() {
		browser.assert.input('.TestRecipeOutput', '');	
	});

	it('assert callbacks count 0')

	before('shows items', function() {
		browser.assert.elements(LCHLauncherListItem, 2);
	});

	it('selects no items', async function() {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
	});

	describe('filter', function () {

		context('match', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			it('shows matching items', function() {
				browser.assert.elements(LCHLauncherListItem, 2);
			});

			it('selects first item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
			});

			it('assert callbacks count 1')

			it('runs callback', function() {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
		
		});

		context('match update', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'al');
			});
			
			it('shows matching items', function() {
				browser.assert.elements(LCHLauncherListItem, 1);
			});

			it('assert callbacks count 2/3')

			it('runs callback', function() {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
		
		});
		
		context('no match', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'alb');
			});
			
			it('shows no items', function() {
				browser.assert.elements(LCHLauncherListItem, 0);
			});

			it('assert callbacks count ?')

			it('runs last match callback', function() {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
		
		});

	});

	describe('results', function () {

		before(function() {
			browser.fill(LCHLauncherFilterInput, 'a');
		});

		context('ArrowDown', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('selects next item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');
			});
			
			it('runs callback', function () {
				browser.assert.input('.TestRecipeOutput', 'bravo');	
			});
		
		});

		context('ArrowUp', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			it('selects previous item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
			});
			
			it('runs callback', function () {
				browser.assert.input('.TestRecipeOutput', 'alfa');
			});
		
		});

		it('mouseover')
		context.skip('mouseover', function () {

			before(function () {
				return browser.fire(`${ LCHLauncherListItem }:nth-child(2)`, 'mouseover');
			});
			
			it('sets class', function () {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');	
			});
			
			it('runs no callback', function () {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
		
		});

		context('click', function () {

			before(function () {
				return browser.fire(`${ LCHLauncherListItem }:nth-child(2)`, 'click');
			});

			it('assert callbacks count ?')
			
			it('assert sends did complete')
			
			it('hides LCHLauncher', function () {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

		context('Enter', function () {

			before(function () {
				return browser.pressButton('.TestLauncherInvoke');
			});
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('assert callbacks count ?')
			
			it('runs callback', function () {
				browser.assert.input('textarea', 'alfa');	
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

		context('Escape filter', function () {

			before(function () {
				return browser.pressButton('.TestLauncherInvoke');
			});
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('clears filter', function() {
				browser.assert.input(LCHLauncherFilterInput, '');
			});
		
		});

		context('Escape no filter', function () {

			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('hides LCHLauncher', function() {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

	});
	
});

describe.only('LCHLauncherMiscPipe', function testLCHLauncherMiscPipe() {	

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

	describe('prompts', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'kRunModePipe',
			}));
		});

		it('sets class', function() {
			browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
		});

		context('click', function () {

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'a');
			});
			
			before(function() {
				return browser.click(LCHLauncherActionPrompt);
			});

			it('sets class', function() {
				browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
			});
		
		});

		context('Tab', function () {

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('sets class', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});
		
		});

		context('Shift+Tab', function () {

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
					shiftKey: true,
				});
			});

			it('sets class', function() {
				browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
			});
		
		});

		context('click if no subject', function () {

			before(function() {
				browser.click(LCHLauncherSubjectPrompt);
			});

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			});

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			});

			before(function() {
				browser.click(LCHLauncherSubjectPrompt);
			});

			it('does nothing', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});
		
		});

		context('Tab if no subject', function () {

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('does nothing', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});
		
		});

		context('Shift+Tab if no subject', function () {

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
					shiftKey: true,
				});
			});

			it('does nothing', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});
		
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
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
			
		before(function() {
			browser.assert.hasNoClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'x');
		});

		it('sets class', function() {
			browser.assert.hasClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
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
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		it('sets LCHLauncherSubjectPromptHeading', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'AA');
		});
		
	});

	describe('Backspace', function() {

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});

		it('sets LCHLauncherSubjectPromptHeading', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
		});

		context('last character', function () {
			
			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			});

			it('sets LCHLauncherSubjectPromptHeading', function() {
				browser.assert.text(LCHLauncherSubjectPromptHeading, uLocalized('LCHLauncherSubjectPromptHeadingText'));
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
	
});

import { LCHLauncherThrottleDuration } from './ui-logic.js';

describe.skip('LCHLauncherMiscPipe', function () {

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

		context('MatchStop', function() {

			before(async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'x');
				await browser.wait({element: LCHLauncherSubjectPromptItemSelected});
			});

			it('shows result list', async function() {
				browser.assert.elements(LCHLauncherResultList, 1);
			});

			it('keeps matched results', async function() {
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultListItem, 7);
			});

			it('passes MatchStop to LCHLauncherPromptHeading', async function() {
				browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 1);
			});

			it('continues to throttle keydown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'x');
				await browser.wait({element: LCHLauncherSubjectPromptItemSelected});

				deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'AXX');
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultListItem, 7);
			});

			it('removes MatchStop on keydown', async function() {
				await browser.wait({duration: LCHLauncherThrottleDuration * 2});
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherSubjectPromptItemSelected});

				deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'A');
				browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 0);
			});
			
		});

		context('on Backspace after throttle', function() {

			before(async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherResultList});

				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 7);

				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherSubjectPromptItemSelected});
			});
			
			it('clears filter ', function() {
				deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'Subject');
			});
			
			it('keeps results', function() {
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 7);
			});

		});

		context('on Backspace after clear filter', function() {

			before(async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});
			});
			
			it('clears results', function() {
				browser.assert.elements(LCHLauncherPipeItem, 0);
			});
			
			it('shows placeholder', function() {
				browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
			});

		});

		context('on type after inputThrottle', function() {

			before(async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({duration: LCHLauncherThrottleDuration * 2});

				deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'A');
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 7);

				browser.OLSKFireKeyboardEvent(browser.window, 'b');
				await browser.wait({element: LCHLauncherResultList});
			});
			
			it('replaces filter', function() {
				deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'B');
			});

		});

		context('on Tab', function () {
			
			it('hides open result list', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherSubjectPrompt});
				
				browser.assert.elements(LCHLauncherResultList, 0);
			});

		});

	});

	context('Tab', function () { // #move:feature

		it('cancels throttle', async function() {
			await browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));

			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			await browser.wait({element: LCHLauncherSubjectPromptHeading});

			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');

			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			await browser.wait({duration: LCHLauncherThrottleDuration});

			browser.assert.elements(LCHLauncherResultList, 0);

		});
	
	});

	context('DotModeInput', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));
		});
			
		context('on Dot', function () {
			
			it('hides LCHLauncherSubjectPromptPlaceholder', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, '.');
				await browser.wait({element: LCHLauncherPromptDotModeInput});
				
				browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);
			});
				
			it('shows LCHLauncherPromptDotModeInput', function() {
				browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
				browser.assert.attribute(LCHLauncherPromptDotModeInput, 'autofocus', '');
			});

			it('focuses input', function() { // #move interaction
				deepEqual(browser.document.activeElement, browser.query(LCHLauncherPromptDotModeInput));
			});
		
		});
			
		context('on Escape', function () {
			
			it('hide LCHLauncherPromptDotModeInput', function() {
				browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
			});
				
			it('shows LCHLauncherSubjectPromptPlaceholder', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
				await browser.wait({element: LCHLauncherPromptDotModeInput});
				
				browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
			});
		
		});
			
		context('on Dot when results visible', function () {

			before(async function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherResultList});

				browser.OLSKFireKeyboardEvent(browser.window, '.');
				await browser.wait({element: LCHLauncherPromptDotModeInput});
			});
			
			it('hides results', async function() {
				browser.assert.elements(LCHLauncherResultList, 0);
			});

			it('clears filter text', function() {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'Subject'); // #move language
			});

			it('clears actions', function() {
				browser.assert.elements(LCHLauncherPipeItem, 0);
			});
		
		});
			
		context('on Dot when throttling', function () {

			before(async function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
				await browser.wait({element: LCHLauncherSubjectPromptPlaceholder});

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, '.');
				await browser.wait({duration: LCHLauncherThrottleDuration});
			});
			
			it('skips throttle', async function() {
				browser.assert.elements(LCHLauncherResultList, 0);
			});
		
		});
			
		context('in mode', function () {

			before(async function () {
				browser.OLSKFireKeyboardEvent(browser.window, '.');
				await browser.wait({element: LCHLauncherPromptDotModeInput});
			});
			
			it('shows no actions', async function() {
				browser.assert.elements(LCHLauncherPipeItem, 0);
			});

			it('shows actions if filled', async function() {
				browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherPipeItem, 1);
			});

			it('upates actions for type', async function() {
				browser.fill(LCHLauncherPromptDotModeInput, 'https://example.com');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.text(LCHLauncherPipeItem, 'Open URL');
			});

			it('shows no actions if empty', async function() {
				browser.fill(LCHLauncherPromptDotModeInput, '');
				await browser.wait({element: LCHLauncherPromptDotModeInput});

				browser.assert.elements(LCHLauncherPipeItem, 0);
			});

			context('on Escape', function () {

				before(function () {
					browser.fill(LCHLauncherPromptDotModeInput, 'bravo');
					browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
					return browser.wait({element: LCHLauncherPipeItem});
				});
				
				it('shows text item as pipe item', async function() {
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				});
			
			});

			context('on Tab', function () {

				before(async function () {
					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});

					browser.fill(LCHLauncherPromptDotModeInput, '');
					browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
					await browser.wait({element: LCHLauncherPromptDotModeInput});
				});
				
				it('does nothing if empty', async function() {
					browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
					browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);

					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});

					browser.fill(LCHLauncherPromptDotModeInput, 'charlie');
					browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
					await browser.wait({element: LCHLauncherPromptDotModeInput});
				});
				
				it('shows text item as pipe item', async function() {
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				});
				
				it('selects next prompt', async function() {
					browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
				});
				
				it('executes composition on Enter', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
					await browser.wait({element: '#LCHCopyToClipboardButton'});

					browser.click('#LCHCopyToClipboardButton');
					await browser.wait({element: '#LCHLauncherTestDidFinish'});

					browser.assert.elements('#LCHLauncherTestDidFinish', 1);
				});
			
			});

			context('on Enter', function () {

				before(async function () {
					await browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));

					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});

					browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
					await browser.wait({element: LCHLauncherSubjectPromptPlaceholder});
				});
				
				it('does nothing if empty', async function() {
					browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
				});
				
				it('executes composition', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});

					browser.fill(LCHLauncherPromptDotModeInput, 'delta');
					await browser.wait({element: LCHLauncherPipeItem});

					browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
					await browser.wait({element: '#LCHCopyToClipboardButton'});

					browser.click('#LCHCopyToClipboardButton');
					await browser.wait({element: '#LCHLauncherTestDidFinish'});

					browser.assert.elements('#LCHLauncherTestDidFinish', 1);
				});
			
			});

		});
			
		context('on Dot when action prompt selected', function () {

			before(async function () {
				await browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherResultList});

				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherActionPrompt});

				browser.assert.elements(LCHLauncherPipeItem, 2);
			});

			it('does nothing if selected prompt is action', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, '.');
				await browser.wait({element: LCHLauncherSubjectPrompt});

				browser.assert.elements(LCHLauncherPipeItem, 2);
			});
		
		});
			
		context('on Dot Escape', function () {

			before(async function () {
				await browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));

				browser.OLSKFireKeyboardEvent(browser.window, '.');
				await browser.wait({element: LCHLauncherPromptDotModeInput});

				browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
				await browser.wait({element: LCHLauncherPipeItem});
			});

			context('on re-entry', function () {

				before(async function () {
					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});
				});
				
				it('shows previous text input', async function() {
					browser.assert.input(LCHLauncherPromptDotModeInput, 'alfa');
				});
				
				it('shows actions', async function() {
					browser.assert.elements(LCHLauncherPipeItem, 1);
				});
			
			});

			context('on Backspace', function () {

				before(async function () {
					browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
					await browser.wait({element: LCHLauncherPipeItem});

					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherSubjectPromptPlaceholder});

					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});
				});
				
				it('shows empty text', async function() {
					browser.assert.input(LCHLauncherPromptDotModeInput, '');
				});
				
				it('shows no actions', async function() {
					browser.assert.elements(LCHLauncherPipeItem, 0);
				});
			
			});
		
		});

	});

	context('ObjectPrompt', function () {

		before(async function () {
			await browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));
			
			browser.OLSKFireKeyboardEvent(browser.window, '.');
			await browser.wait({element: LCHLauncherPromptDotModeInput});
			
			browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			await browser.wait({element: LCHLauncherPromptDotModeInput});

			browser.assert.elements(LCHLauncherObjectPrompt, 0);

			browser.OLSKFireKeyboardEvent(browser.window, 'w');
			await browser.wait({element: LCHLauncherActionPromptItemSelected});
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
			browser.assert.text(LCHLauncherActionPromptItemSelected, 'Search With');
		});

		it('shows LCHLauncherObjectPrompt', async function() {
			browser.assert.elements(LCHLauncherObjectPrompt, 1);
		});

		it('localizes LCHLauncherObjectPromptHeading', async function() {
			browser.assert.text(LCHLauncherObjectPromptHeading, 'Object');
		});

		it('selects first object', async function() {
			browser.assert.text(`${ LCHLauncherObjectPromptItemSelected } .LCHLauncherPipeItemTitle`, 'Wikipedia');
		});

		it('selects LCHLauncherObjectPrompt on Tab', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			await browser.wait({element: LCHLauncherPromptDotModeInput});

			browser.assert.hasClass(LCHLauncherObjectPrompt, 'LCHLauncherPromptSelected');
		});

		it('ignores Dot if not String', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, '.');
			await browser.wait({element: LCHLauncherPromptDotModeInput});
			
			browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
		});

		it('selects LCHLauncherSubjectPrompt on Tab', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			await browser.wait({element: LCHLauncherPromptDotModeInput});

			browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
		});
			
		it('excludes string objects', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'w');
			await browser.wait({element: LCHLauncherPromptDotModeInput});

			browser.assert.elements(LCHLauncherObjectPromptItemSelected, 0);
		});

		it('focuses LCHLauncherObjectPrompt if one action', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			await browser.wait({element: LCHLauncherPromptDotModeInput});

			browser.assert.hasClass(LCHLauncherObjectPrompt, 'LCHLauncherPromptSelected');
		});
			
		it('shows LCHLauncherPromptDotModeInput if String', function() {
			browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
			browser.assert.attribute(LCHLauncherPromptDotModeInput, 'autofocus', '');
		});

	});

});

describe('LCHRecipeIsHidden', function testLCHRecipeIsHidden () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {}, // #purge-callback
				LCHRecipeIsHidden: function () {
					return document.querySelector('.TestRecipeOutput').value !== 'bravo';
				},
			}]),
		}));
	});

	context('no match', function () {

		before(function() {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('hides item', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
	
	});

	context('match', function () {
		
		before(function() {
			browser.fill('.TestRecipeOutput', 'bravo');
		});

		before(function() {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('shows item', function() {
			browser.assert.elements(LCHLauncherListItem, 1);
		});
	
	});

});

describe('LCHRecipeURLFilter', function testLCHRecipeURLFilter () {

	const StubRecipes = uStubStringify([{
		LCHRecipeName: 'alfa',
		LCHRecipeCallback: function () {
			document.querySelector('.TestRecipeOutput').value = 'bravo';
		},
		LCHRecipeURLFilter: '/\\d{5}/',
	}]);

	context('no match', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes,
			}));
		});
		
		before(function() {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('hides item', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
	
	});

	context('match', function () {
		
		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes,
				charlie: '12345',
			}));
		});
		
		before(function() {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('shows item', function() {
			browser.assert.elements(LCHLauncherListItem, 1);
		});
	
	});

});

describe('LCHRecipeIsAutomatic', function testLCHRecipeIsAutomatic () {

	const StubRecipes = uStubStringify([{
		LCHRecipeName: 'alfa',
		LCHRecipeCallback: function () {
			document.querySelector('.TestRecipeOutput').value = 'bravo';
		},
		LCHRecipeURLFilter: '/\\d{5}/',
		LCHRecipeIsAutomatic: true,
	}]);

	context('no match', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes,
			}));
		});

		it('runs no callback', function() {
			browser.assert.input('.TestRecipeOutput', '');
		});
	
	});

	context('match', function () {
		
		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes,
				charlie: '12345',
			}));
		});
		
		before(function() {
			browser.fill(LCHLauncherFilterInput, 'LCHRecipeURLFilter');
		});

		it('runs callback', function() {
			browser.assert.input('.TestRecipeOutput', 'bravo');
		});
	
	});

});

describe('LCHRecipeStyle', function testLCHRecipeStyle () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeStyle: 'body { background: red; }',
				LCHRecipeCallback: function () {}, // #purge-callback
			}]),
		}));
	});

	before(function () {
		browser.assert.elements('body style', 0);
	});

	before(function () {
		return browser.fill(LCHLauncherFilterInput, 'alfa');
	});

	before(function() {
		browser.click(LCHLauncherListItem);
	});

	it('inserts style element', function() {
		browser.assert.elements('body style', 1);
	});

	it('inserts style element', function() {
		browser.assert.text('body style', 'body { background: red; }');
	});

});

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

		it('shows LCHLauncherPipeItemSource', function() {
			browser.assert.elements(LCHLauncherPipeItemSource, 1)
		});

		it('sets LCHLauncherPipeItemSource', function() {
			browser.assert.text(LCHLauncherPipeItemSource, 'loc.tests')
		});
	
	});

});

// #purge
// describe('LCHLauncherTestConvertTypeServiceSearch', function () {

// 	before(function() {
// 		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
	// LCHLauncherTestConvertTypeServiceSearch: 'alfa',
// }));
// 	});

// 	it('shows one item', async function() {
// 		browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestConvertTypeServiceSearch');
// 		await browser.wait({element: LCHLauncherListItem});

// 		browser.assert.elements(LCHLauncherListItem, 1);
// 	});

// });


// #purge
// context('LCHLauncherTestConvertTypeServiceSearch', function () {

// 	before(function() {
// 		return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LCHLauncherTestConvertTypeServiceSearch`);
// 	});

// 	it('converts recipe', async function() {
// 		browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestConvertTypeServiceSearch');
// 		await browser.wait({element: LCHLauncherListItem});

// 		browser.assert.text(LCHLauncherListItem, uFormatted(uLocalized('LCHLauncherTestConvertTypeServiceSearchTextFormat'), 'LCHLauncherTestConvertTypeServiceSearch'));
// 	});

// });
