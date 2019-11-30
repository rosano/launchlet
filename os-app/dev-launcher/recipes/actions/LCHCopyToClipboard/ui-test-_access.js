import { deepEqual } from 'assert';

const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHCopyToClipboardButton: '.LCHCopyToClipboardButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHCopyToClipboard_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHOptionMode: 'LCHModePipe',
		});
	});

	before(function() {
		return browser.OLSKFireKeyboardEvent(browser.window, '.');
	});

	before(function() {
		browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
		
		browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
	});

	it('shows LCHCopyToClipboardButton', function() {
		browser.assert.elements(LCHCopyToClipboardButton, 1);
	});

	context('click', function () {
		
		before(function () {
			return browser.pressButton(LCHCopyToClipboardButton);
		});

		it('hides LCHCopyToClipboardButton', function() {
			browser.assert.elements(LCHCopyToClipboardButton, 0);
		});
	
	});

});
