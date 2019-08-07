import { throws, deepEqual } from 'assert';
import {
	LCHLauncherModeCommit,
	LCHLauncherModeJump,
	LCHLauncherModePipe,
	LCHLauncherThrottleDuration,
} from './ui-logic.js';

Object.entries({
	browser: new OLSKBrowser(),
	kDefaultRoutePath: '/launcher',

	LCHLauncherFilterInput: '#LCHLauncherFilterInput',
	LCHLauncherZoneInput: '.LCHLauncherZoneInput',
	LCHLauncherZoneInputHeading: '.LCHLauncherZoneInputHeading',

	LCHLauncherList: '.ListContainer',
	LCHLauncherListItem: '.ListItem',

	LCHLauncherPipeItem: '.LCHLauncherPipeItem',
	LCHLauncherResultList: '.LCHLauncherResultList',
	LCHLauncherResultListItem: '.LCHLauncherResultListItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherDiscovery', function testLCHLauncherDiscovery() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeCommit() }`);
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
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeJump() }`);
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
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModePipe() }`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 0);
			browser.assert.elements(LCHLauncherZoneInput, 1);

			browser.assert.elements(LCHLauncherResultList, 0);
			browser.assert.elements(LCHLauncherListItem, 0);
			browser.assert.elements(LCHLauncherList, 0);
			browser.assert.elements(LCHLauncherPipeItem, 0);
		});
		
		context('on keydown', function() {
			
			it('does nothing if no match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, '[');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherPipeItem, 0);
			});
			
			it('removes last character if backspace', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherPipeItem, 0);
			});
			
			it('shows first item if match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(`${ LCHLauncherZoneInput } ${ LCHLauncherPipeItem }`, 1);
			});

			it('shows list after throttle', async function() {
				browser.assert.elements(LCHLauncherResultList, 0);
				browser.assert.elements(LCHLauncherResultListItem, 0);

				await browser.wait({duration: LCHLauncherThrottleDuration * 2});

				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
			});

			it.skip('selects first list item', async function() {
				await browser.wait({element: '.LCHLauncherResultListItemSelected'});
				browser.assert.hasClass(LCHLauncherResultListItem, 'LCHLauncherResultListItemSelected');
			});
			
			it('keeps previous results if match stops', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'x');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(`${ LCHLauncherZoneInput } ${ LCHLauncherPipeItem }`, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
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
				browser.assert.elements(`${ LCHLauncherZoneInput } ${ LCHLauncherPipeItem }`, 1);
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
				browser.assert.elements(`${ LCHLauncherZoneInput } ${ LCHLauncherPipeItem }`, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
			});

			context('on Backspace after throttle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
					await browser.wait({element: LCHLauncherResultList});

					browser.assert.elements(`${ LCHLauncherZoneInput } ${ LCHLauncherPipeItem }`, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 2);

					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherPipeItem});
				});
				
				it('clears filter ', function() {
					deepEqual(browser.query(LCHLauncherZoneInputHeading).textContent, 'Subject');
				});
				
				it('keeps results ', function() {
					browser.assert.elements(`${ LCHLauncherZoneInput } ${ LCHLauncherPipeItem }`, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 2);
				});

			});

			context('on Backspace after clear filter', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherPipeItem});
				});
				
				it('clears results ', function() {
					browser.assert.elements(LCHLauncherPipeItem, 0);
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
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=${ LCHLauncherModeJump() }`);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderJump'));
				});

			});

			context('LCHLauncherModePipe', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=${ LCHLauncherModePipe() }`);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingSubject'));
				});

				it('on keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherPipeItem});

					deepEqual(browser.query(LCHLauncherZoneInputHeading).textContent, 'A');
				});

			});

		});
		
	});
});

describe('LCHLauncherInteraction', function testLCHLauncherInteraction() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeCommit() }`);
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
				return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeCommit() }`);
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
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeJump() }`);
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
				return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModeJump() }`);
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

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=${ LCHLauncherModePipe() }`);
		});
		
		context('on startup', function() {
			
			it('selects LCHLauncherZoneInput', function() {
				browser.assert.hasClass(LCHLauncherZoneInput, 'LCHLauncherZoneInputSelected');
			});

		});

	});
		
	context('shared', function () {

		before(function() {
			return browser.visit(kDefaultRoutePath);
		});

		it('closes on Escape', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});

	});

});
