import { throws, deepEqual } from 'assert';
import {
	LCHLauncherModeCommit,
	LCHLauncherModeJump,
	LCHLauncherModePipe,
	LCHLauncherThrottleDuration,
} from './ui-logic.js';


const browser = new OLSKBrowser();
const kDefaultRoutePath = '/launcher';

Object.entries({
	kLCHLauncherFilterInput: '#LCHLauncherFilterInput',
	kLCHLauncherSubjectZoneInput: '.LCHLauncherSubjectZoneInput .LCHLauncherZoneInput',
	kLCHLauncherSubjectZoneInputHeading: '.LCHLauncherSubjectZoneInput .LCHLauncherZoneInputHeading',
	kLCHLauncherActionZoneInput: '.LCHLauncherActionZoneInput .LCHLauncherZoneInput',
	kLCHLauncherActionZoneInputHeading: '.LCHLauncherActionZoneInput .LCHLauncherZoneInputHeading',

	kLCHLauncherList: '.ListContainer',
	kLCHLauncherListItem: '.ListItem',

	kLCHLauncherPipeItem: '.LCHLauncherPipeItem',
	kLCHLauncherSubjectPipeItem: '.LCHLauncherSubjectZoneInput .LCHLauncherPipeItem',
	kLCHLauncherResultList: '.LCHLauncherResultList',
	kLCHLauncherResultListItem: '.LCHLauncherResultListItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherAccess', function testkLCHLauncherAccess() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeCommit() }`);
		});
		
		it('on startup', function() {
			browser.assert.elements(kLCHLauncherFilterInput, 1);
			
			browser.assert.elements(kLCHLauncherListItem, 0);
		});

		it('on filter', async function() {
			browser.fill(kLCHLauncherFilterInput, 'a');
			await browser.wait({element: kLCHLauncherListItem});

			browser.assert.elements(kLCHLauncherListItem, 5);
		});

	});

	context('LCHLauncherModeJump', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeJump() }`);
		});
		
		it('on startup', function() {
			browser.assert.elements(kLCHLauncherFilterInput, 1);

			browser.assert.elements(kLCHLauncherListItem, 13);
		});

		it('on filter', async function() {
			browser.fill(kLCHLauncherFilterInput, 'a');
			await browser.wait({element: kLCHLauncherListItem});

			browser.assert.elements(kLCHLauncherListItem, 5);
		});

	});

	context('LCHLauncherModePipe', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModePipe() }`);
		});
		
		it('on startup', function() {
			browser.assert.elements(kLCHLauncherFilterInput, 0);
			browser.assert.elements(kLCHLauncherSubjectZoneInput, 1);
			browser.assert.elements(kLCHLauncherActionZoneInput, 1);

			browser.assert.elements(kLCHLauncherList, 0);
			browser.assert.elements(kLCHLauncherListItem, 0);
			browser.assert.elements(kLCHLauncherResultList, 0);
			browser.assert.elements(kLCHLauncherResultListItem, 0);
			browser.assert.elements(kLCHLauncherPipeItem, 0);
		});
		
		context('on keydown', function() {
			
			it('does nothing if no match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, '[');
				await browser.wait({element: kLCHLauncherSubjectZoneInputHeading});
				deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, '[');

				browser.assert.elements(kLCHLauncherPipeItem, 0);
			});
			
			it('shows first item if match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: kLCHLauncherSubjectZoneInputHeading});

				browser.assert.elements(kLCHLauncherSubjectPipeItem, 1);
			});
			
			it('hides list', async function() {
				browser.assert.elements(kLCHLauncherResultList, 0);
				browser.assert.elements(kLCHLauncherResultListItem, 0);
			});

			it('shows list after throttle', async function() {
				await browser.wait({element: kLCHLauncherResultList});

				browser.assert.elements(kLCHLauncherResultList, 1);
				browser.assert.elements(kLCHLauncherResultListItem, 5);
			});

			it.skip('selects first list item', async function() {
				await browser.wait({element: '.LCHLauncherResultListItemSelected'});
				browser.assert.hasClass(kLCHLauncherResultListItem, 'LCHLauncherResultListItemSelected');
			});

			it('skips throttle on ArrowDown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: kLCHLauncherPipeItem});

				browser.assert.elements(kLCHLauncherPipeItem, 0);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: kLCHLauncherResultList});
				browser.assert.elements(kLCHLauncherSubjectPipeItem, 1);
				browser.assert.elements(kLCHLauncherResultList, 1);
				browser.assert.elements(kLCHLauncherResultListItem, 5);
			});

			it('skips throttle on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: kLCHLauncherPipeItem});

				browser.assert.elements(kLCHLauncherPipeItem, 0);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: kLCHLauncherResultList});
				browser.assert.elements(kLCHLauncherSubjectPipeItem, 1);
				browser.assert.elements(kLCHLauncherResultList, 1);
				browser.assert.elements(kLCHLauncherResultListItem, 5);
			});

			context('MatchStop', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'x');
					await browser.wait({element: kLCHLauncherSubjectPipeItem});
				});

				it('shows result list', async function() {
					browser.assert.elements(kLCHLauncherResultList, 1);
				});

				it('keeps matched results', async function() {
					browser.assert.elements(kLCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(kLCHLauncherResultListItem, 5);
				});

				it('passes MatchStop to LCHLauncherSubjectZoneInput', async function() {
					browser.assert.elements('.LCHLauncherZoneInputHeadingMatchStop', 1);
				});

				it('continues to throttle keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'x');
					await browser.wait({element: kLCHLauncherSubjectPipeItem});

					deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, 'AXX');
					browser.assert.elements(kLCHLauncherResultList, 1);
					browser.assert.elements(kLCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(kLCHLauncherResultListItem, 5);
				});

				it('removes MatchStop on keydown', async function() {
					await browser.wait({duration: LCHLauncherThrottleDuration * 2});
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: kLCHLauncherSubjectPipeItem});

					deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, 'A');
					browser.assert.elements('.LCHLauncherZoneInputHeadingMatchStop', 0);
				});
				
			});

			context('on Backspace after throttle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');

					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
					await browser.wait({element: kLCHLauncherResultList});

					browser.assert.elements(kLCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(kLCHLauncherResultList, 1);
					browser.assert.elements(kLCHLauncherResultListItem, 5);

					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: kLCHLauncherSubjectPipeItem});
				});
				
				it('clears filter ', function() {
					deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, 'Subject');
				});
				
				it('keeps results ', function() {
					browser.assert.elements(kLCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(kLCHLauncherResultList, 1);
					browser.assert.elements(kLCHLauncherResultListItem, 5);
				});

			});

			context('on Backspace after clear filter', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: kLCHLauncherPipeItem});
				});
				
				it('clears results', function() {
					browser.assert.elements(kLCHLauncherPipeItem, 0);
				});

			});

			context('on type after inputThrottle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({duration: LCHLauncherThrottleDuration * 2});

					deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, 'A');
					browser.assert.elements(kLCHLauncherSubjectPipeItem, 1);
					browser.assert.elements(kLCHLauncherResultList, 1);
					browser.assert.elements(kLCHLauncherResultListItem, 5);

					browser.OLSKFireKeyboardEvent(browser.window, 'b');
					await browser.wait({element: kLCHLauncherResultList});
				});
				
				it('replaces filter', function() {
					deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, 'B');
				});

			});

		});

	});

});

describe('LCHLauncherLanguage', function testkLCHLauncherLanguage() {

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
					deepEqual(browser.query(kLCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderDefault'));
				});

				it('on filter', async function() {
					browser.fill(kLCHLauncherFilterInput, 'a');
					await browser.wait({element: kLCHLauncherListItem});

					deepEqual(browser.queryAll(kLCHLauncherListItem)[0].textContent, 'Alfa');
				});

			});

			context('LCHLauncherModeJump', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=${ LCHLauncherModeJump() }`);
				});

				it('on startup', function() {
					deepEqual(browser.query(kLCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderJump'));
				});

			});

			context('LCHLauncherModePipe', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=${ LCHLauncherModePipe() }`);
				});

				it('on startup', function() {
					deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingSubject'));
					deepEqual(browser.query(kLCHLauncherActionZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingAction'));
				});

				it('on keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: kLCHLauncherSubjectZoneInputHeading});

					deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, 'A');
				});
				
				it('on keydown Backspace', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: kLCHLauncherSubjectZoneInputHeading});
					
					deepEqual(browser.query(kLCHLauncherSubjectZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingSubject'));
				});

			});

		});
		
	});
});

describe('LCHLauncherInteraction', function testkLCHLauncherInteraction() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeCommit() }`);
		});
		
		it('shows no items if no filter', function() {
			browser.assert.elements(kLCHLauncherListItem, 0);
		});
		
		it('shows no items if no match', function() {
			browser.fill(kLCHLauncherFilterInput, 'alfabravo');

			browser.assert.elements(kLCHLauncherListItem, 0);
		});

		it('shows items if filter and match', async function() {
			browser.fill(kLCHLauncherFilterInput, 'a');
			await browser.wait({element: kLCHLauncherListItem});
			
			browser.assert.elements(kLCHLauncherListItem, 5);
		});

		it('selects first item', async function() {
			browser.assert.hasClass(browser.queryAll(kLCHLauncherListItem)[0], 'ListItemSelected');
		});

		it('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(kLCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: kLCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(kLCHLauncherListItem)[1], 'ListItemSelected');
		});

		it('does not run item on select', async function() {
			browser.assert.input('textarea', '');
		});

		it('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(kLCHLauncherListItem)[0], 'click');
			await browser.wait({element: kLCHLauncherListItem});

			browser.assert.input('textarea', 'Alfa');

			browser.assert.elements(kLCHLauncherFilterInput, 0);
		});

		context('shortcuts', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeCommit() }`);
			});

			it('selects next item on ArrowDown', async function() {
				browser.fill(kLCHLauncherFilterInput, 'a');
				await browser.wait({element: kLCHLauncherListItem});

				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: kLCHLauncherListItem});

				browser.assert.hasClass(browser.queryAll(kLCHLauncherListItem)[1], 'ListItemSelected');
			});

			it('selects previous item on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: kLCHLauncherListItem});

				browser.assert.hasClass(browser.queryAll(kLCHLauncherListItem)[0], 'ListItemSelected');
			});

			it('runs item and closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: kLCHLauncherListItem});

				browser.assert.elements(kLCHLauncherFilterInput, 0);
			});

		});

	});

	context('LCHLauncherModeJump', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeJump() }`);
		});

		it('selects no items', async function() {
			browser.assert.elements('.ListItemSelected', 0);
		});

		it('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(kLCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: kLCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(kLCHLauncherListItem)[1], 'ListItemSelected');
		});

		it('does not run item on mouseover', async function() {
			browser.assert.input('textarea', '');
		});

		it('runs first item if filter and match', async function() {
			browser.fill(kLCHLauncherFilterInput, 'a');
			await browser.wait({element: kLCHLauncherListItem});
			
			browser.assert.input('textarea', 'Alfa');
		});

		it('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(kLCHLauncherListItem)[1], 'click');
			await browser.wait({element: kLCHLauncherListItem});

			browser.assert.input('textarea', 'Bravo');

			browser.assert.elements(kLCHLauncherFilterInput, 0);
		});


		context('shortcuts', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeJump() }`);
			});

			it('runs item on ArrowDown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: kLCHLauncherListItem});

				browser.assert.input('textarea', 'Alfa');
			});

			it('runs item on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: kLCHLauncherListItem});

				browser.assert.input('textarea', 'Hello');
			});

			it('closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: kLCHLauncherListItem});

				browser.assert.elements(kLCHLauncherFilterInput, 0);
			});

		});

	});

	context('LCHLauncherModePipe', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModePipe() }`);
		});
		
		context('on startup', function() {
			
			it('selects LCHLauncherSubjectZoneInput', function() {
				browser.assert.hasClass(kLCHLauncherSubjectZoneInput, 'LCHLauncherZoneInputSelected');
			});

		});

	});
		
	context('shared', function () {

		before(function() {
			return browser.visit(kDefaultRoutePath);
		});

		it('closes on Escape', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			await browser.wait({element: kLCHLauncherListItem});

			browser.assert.elements(kLCHLauncherFilterInput, 0);
		});

	});

});
