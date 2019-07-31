import { throws, deepEqual } from 'assert';
import { LCHLauncherModeDefault, LCHLauncherModeJump } from './ui-logic.js'

const Browser = require('zombie');

Browser.localhost('loc.tests', 3000, eventName = 'keydown');
Browser.prototype.OLSKFireKeyboardEvent = function(target, keyCode) {
	const event = this.window.document.createEvent('HTMLEvents');
	event.initEvent(eventName, true, true);
	event.which = event.keyCode = event.code = keyCode;

	target = typeof target === 'string' ? this.query(target) : target;

	if (!target) {
		throw new Error('no target')
	}

	target.dispatchEvent(event);
};

Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	LCHLauncherListItem: '.ListItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

const browser = new Browser();

describe('LCHLauncherUITestDiscovery', function testDiscovery() {

	context('LCHLauncherModeDefault', function () {

		before(function() {
			return browser.visit(`/launcher?runMode=${ LCHLauncherModeDefault }`);
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
			return browser.visit(`/launcher?runMode=${ LCHLauncherModeJump }`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherListItem, 13);
		});

		it('on filter', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 5);
		});

	});

});

describe('LCHLauncherUITestLanguage', function testLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			context('LCHLauncherModeDefault', function () {

				before(function() {
					return browser.visit(`${ languageCode }/launcher?runMode=${ LCHLauncherModeDefault }`);
				});

				it('localizes interface', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderDefault'));
				});

				it.skip('on filter', async function() {
					browser.fill(LCHLauncherFilterInput, 'a');
					await browser.wait({element: LCHLauncherListItem});

					// browser.assert.elements(LCHLauncherListItem, 1);
				});

			});

			context('LCHLauncherModeJump', function () {

				before(function() {
					return browser.visit(`${ languageCode }/launcher?runMode=${ LCHLauncherModeJump }`);
				});

				it('localizes interface', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderJump'));
				});

			});

		});
		
	});
});

describe('LCHLauncherUITestInteraction', function testInteraction() {

	context('LCHLauncherModeDefault', function () {

		before(function() {
			return browser.visit(`/launcher?runMode=${ LCHLauncherModeDefault }`);
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

		it('runs item on click', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[0], 'click');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 0);
		});


		context('shortcuts', function () {

			before(function() {
				return browser.visit(`/launcher?runMode=${ LCHLauncherModeDefault }`);
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

			it('runs item on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherListItem, 0);
			});

		});

	});

	context('LCHLauncherModeJump', function () {

		before(function() {
			return browser.visit(`/launcher?runMode=${ LCHLauncherModeJump }`);
		});
		
		it.skip('shows no items if no filter', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
		
		it.skip('shows no items if no match', function() {
			browser.fill(LCHLauncherFilterInput, 'alfabravo');

			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it.skip('shows items if filter and match', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});
			
			browser.assert.elements(LCHLauncherListItem, 5);
		});

		it('selects no items', async function() {
			browser.assert.elements('.ListItemSelected', 0);
		});

		it.skip('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'ListItemSelected');
		});

		it.skip('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[0], 'click');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 0);
		});


		context.skip('shortcuts', function () {

			before(function() {
				return browser.visit(`/launcher?runMode=${ LCHLauncherModeJump }`);
			});

			it('closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherListItem, 0);
			});

		});

	});

});
