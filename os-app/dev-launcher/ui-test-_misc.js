import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguages[0]);
};

describe('LCHLauncherMisc_Commit', function testLCHLauncherMisc_Commit() {

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

describe('LCHLauncherMisc_Preview', function testLCHLauncherMisc_Preview() {	

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

describe('LCHLauncherMisc_Pipe', function testLCHLauncherMisc_Pipe() {	

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

	context('Tab', function () { // #move:misc

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

});
