import { throws, deepEqual } from 'assert';
import { LCHLauncherThrottleDuration } from './ui-logic.js';


const browser = new OLSKBrowser();
const kDefaultRoutePath = '/launcher';

Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',
	LCHLauncherSubjectPrompt: '.LCHLauncherSubjectPrompt',
	LCHLauncherSubjectZoneInput: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput',
	LCHLauncherSubjectZoneInputHeading: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInputHeading',
	LCHLauncherActionPrompt: '.LCHLauncherActionPrompt',
	LCHLauncherActionZoneInput: '.LCHLauncherActionPrompt .LCHLauncherZoneInput',
	LCHLauncherActionZoneInputHeading: '.LCHLauncherActionPrompt .LCHLauncherZoneInputHeading',

	LCHLauncherList: '.ListContainer',
	LCHLauncherListItem: '.ListItem',

	LCHLauncherPipeItem: '.LCHLauncherPipeItem',
	LCHLauncherResultList: '.LCHLauncherResultList',
	LCHLauncherResultListItem: '.LCHLauncherResultListItem',
	LCHLauncherSubjectPipeItem: '.LCHLauncherSubjectPrompt .LCHLauncherPipeItem',
	LCHLauncherActionPipeItem: '.LCHLauncherActionPrompt .LCHLauncherPipeItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherAccess', function testLCHLauncherAccess() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 1);
			
			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it('on filter', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 5);
		});

	});

	context('LCHLauncherModeJump', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeJump`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 1);

			browser.assert.elements(LCHLauncherListItem, 13);
		});

		it('on filter', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 5);
		});

	});

	context('LCHLauncherModePipe', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 0);
			browser.assert.elements(LCHLauncherSubjectZoneInput, 1);
			browser.assert.elements(LCHLauncherActionZoneInput, 1);

			browser.assert.elements(LCHLauncherList, 0);
			browser.assert.elements(LCHLauncherListItem, 0);
			browser.assert.elements(LCHLauncherResultList, 0);
			browser.assert.elements(LCHLauncherResultListItem, 0);
			browser.assert.elements(LCHLauncherPipeItem, 0);
		});
		
		context('on keydown', function() {
			
			it('does nothing if no match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, '[');
				await browser.wait({element: LCHLauncherSubjectZoneInputHeading});
				deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, '[');

				browser.assert.elements(LCHLauncherPipeItem, 0);
			});
			
			it('shows first item if match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherSubjectZoneInputHeading});

				browser.assert.elements(LCHLauncherSubjectPipeItem, 1);
				browser.assert.elements(LCHLauncherActionPipeItem, 1);
			});
			
			it('hides list', async function() {
				browser.assert.elements(LCHLauncherResultList, 0);
				browser.assert.elements(LCHLauncherResultListItem, 0);
			});

			it('shows list after throttle', async function() {
				await browser.wait({element: LCHLauncherResultList});

				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
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
				browser.assert.elements(LCHLauncherSubjectPipeItem, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
			});

			it('skips throttle on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherPipeItem, 0);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherResultList});
				browser.assert.elements(LCHLauncherSubjectPipeItem, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
			});

			context('MatchStop', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'x');
					await browser.wait({element: LCHLauncherSubjectPipeItem});
				});

				it('shows result list', async function() {
					browser.assert.elements(LCHLauncherResultList, 1);
				});

				it('keeps matched results', async function() {
					browser.assert.elements(LCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);
				});

				it('passes MatchStop to LCHLauncherSubjectZoneInput', async function() {
					browser.assert.elements('.LCHLauncherZoneInputHeadingMatchStop', 1);
				});

				it('continues to throttle keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'x');
					await browser.wait({element: LCHLauncherSubjectPipeItem});

					deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, 'AXX');
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);
				});

				it('removes MatchStop on keydown', async function() {
					await browser.wait({duration: LCHLauncherThrottleDuration * 2});
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherSubjectPipeItem});

					deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, 'A');
					browser.assert.elements('.LCHLauncherZoneInputHeadingMatchStop', 0);
				});
				
			});

			context('on Backspace after throttle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');

					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
					await browser.wait({element: LCHLauncherResultList});

					browser.assert.elements(LCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);

					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherSubjectPipeItem});
				});
				
				it('clears filter ', function() {
					deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, 'Subject');
				});
				
				it('keeps results ', function() {
					browser.assert.elements(LCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);
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

			});

			context('on type after inputThrottle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({duration: LCHLauncherThrottleDuration * 2});

					deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, 'A');
					browser.assert.elements(LCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);

					browser.OLSKFireKeyboardEvent(browser.window, 'b');
					await browser.wait({element: LCHLauncherResultList});
				});
				
				it('replaces filter', function() {
					deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, 'B');
				});

			});

		});

	});

});

describe('LCHLauncherLanguage', function testLCHLauncherLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			context('shared', function () {

				before(function() {
					return browser.visit(kDefaultRoutePath);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderDefault'));
				});

				it('on filter', async function() {
					browser.fill(LCHLauncherFilterInput, 'a');
					await browser.wait({element: LCHLauncherListItem});

					deepEqual(browser.queryAll(LCHLauncherListItem)[0].textContent, 'Alfa');
				});

			});

			context('LCHLauncherModeJump', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=kRunModeJump`);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderJump'));
				});

			});

			context('LCHLauncherModePipe', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=kRunModePipe`);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingSubject'));
					deepEqual(browser.query(LCHLauncherActionZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingAction'));
				});

				it('on keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherSubjectZoneInputHeading});

					deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, 'A');
				});
				
				it('on keydown Backspace', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherSubjectZoneInputHeading});
					
					deepEqual(browser.query(LCHLauncherSubjectZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingSubject'));
				});
				
				context('on Tab', function() {
					
					it('selects LCHLauncherActionZoneInput if LCHLauncherSubjectZoneInput selected', async function() {
						browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
						await browser.wait({element: LCHLauncherActionZoneInput});
						
						browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
					});
					
					it('selects LCHLauncherSubjectZoneInput', async function() {
						browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
						await browser.wait({element: LCHLauncherSubjectZoneInput});
						
						browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
					});

					it('hides open result list', async function() {
						browser.OLSKFireKeyboardEvent(browser.window, 'a');
						await browser.wait({element: LCHLauncherResultList});

						browser.assert.elements(LCHLauncherResultList, 1);

						browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
						await browser.wait({element: LCHLauncherSubjectZoneInput});
						
						browser.assert.elements(LCHLauncherResultList, 0);
					});

				});

			});

		});
		
	});
});

describe('LCHLauncherInteraction', function testLCHLauncherInteraction() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
		});
		
		it('shows no items if no filter', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
		
		it('shows no items if no match', function() {
			browser.fill(LCHLauncherFilterInput, 'alfabravo');

			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it('shows items if filter and match', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});
			
			browser.assert.elements(LCHLauncherListItem, 5);
		});

		it('selects first item', async function() {
			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[0], 'ListItemSelected');
		});

		it('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'ListItemSelected');
		});

		it('does not run item on select', async function() {
			browser.assert.input('textarea', '');
		});

		it('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[0], 'click');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.input('textarea', 'Alfa');

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});

		context('shortcuts', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
			});

			it('selects next item on ArrowDown', async function() {
				browser.fill(LCHLauncherFilterInput, 'a');
				await browser.wait({element: LCHLauncherListItem});

				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'ListItemSelected');
			});

			it('selects previous item on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[0], 'ListItemSelected');
			});

			it('runs item and closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherFilterInput, 0);
			});

		});

	});

	context('LCHLauncherModeJump', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeJump`);
		});

		it('selects no items', async function() {
			browser.assert.elements('.ListItemSelected', 0);
		});

		it('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'ListItemSelected');
		});

		it('does not run item on mouseover', async function() {
			browser.assert.input('textarea', '');
		});

		it('runs first item if filter and match', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});
			
			browser.assert.input('textarea', 'Alfa');
		});

		it('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'click');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.input('textarea', 'Bravo');

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});


		context('shortcuts', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeJump`);
			});

			it('runs item on ArrowDown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.input('textarea', 'Alfa');
			});

			it('runs item on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.input('textarea', 'Hello');
			});

			it('closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherFilterInput, 0);
			});

		});

	});

	context('LCHLauncherModePipe', function () {
		
		context('on startup', function() {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
			});
			
			it('selects LCHLauncherSubjectZoneInput', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

		});
		
		context('on Tab', function() {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
			});
			
			it('selects LCHLauncherActionZoneInput if LCHLauncherSubjectZoneInput selected', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherActionZoneInput});
				
				browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
			});
			
			it('selects LCHLauncherSubjectZoneInput', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherSubjectZoneInput});
				
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

		});

	});
		
	context('shared', function () {

		before(function() {
			return browser.visit(kDefaultRoutePath);
		});

		it('closes on Escape', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			await browser.wait({element: LCHLauncherFilterInput});

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});

	});

});
