import { throws, deepEqual } from 'assert';

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

describe('LCHLauncher', function() {

describe('Discovery', function testDiscovery() {

	const browser = new Browser();

	before(function() {
		return browser.visit('/launcher');
	});

	it('on startup', function() {
		browser.assert.elements(LCHLauncherFilterInput, 1);
		
		browser.assert.elements(LCHLauncherListItem, 0);
	});

	it('on filter', async function() {
		browser.fill(LCHLauncherFilterInput, 'a');
		await browser.wait();

		browser.assert.elements(LCHLauncherListItem, 5);
	});

	context.skip('jump', function () {
		
		it('', async function() {
		});

	})

});

describe('Language', function testLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {
			
			const browser = new Browser();
			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(`${ languageCode }/launcher`);
			});

			it('localizes interface', function() {
				deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderDefault'));
			});

			it.skip('on filter', async function() {
				browser.fill(LCHLauncherFilterInput, 'a');
				await browser.wait();

				// browser.assert.elements(LCHLauncherListItem, 1);
			});

		});
		
	});
});

describe('Interaction', function testInteraction() {

	const browser = new Browser();

	before(function() {
		return browser.visit('/launcher');
	});

	context('mode command', function () {
		
		it('shows no items', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
		
		it('shows no items if no match', function() {
			browser.fill(LCHLauncherFilterInput, 'alfabravo');

			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it('shows items if match', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait();
			
			browser.assert.elements(LCHLauncherListItem, 5);
		});

		it('selects first item', async function() {
			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[0], 'ListItemSelected');
		});

	});

	context('shortcut ArrowDown', function () {

		it('selects next item', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			await browser.wait();

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'ListItemSelected');
		});

	});

	context('shortcut ArrowUp', function () {

		it('selects next item', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			await browser.wait();

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[0], 'ListItemSelected');
		});

	});

});

});
