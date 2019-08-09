import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherPrompt';

const kLCHLauncherPrompt = '.LCHLauncherPrompt';
const kLCHLauncherZoneInput = '.LCHLauncherZoneInput';

describe.only('LCHLauncherPromptElements', function testLCHLauncherPromptElements() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(kLCHLauncherPrompt, 1);

		browser.assert.elements(kLCHLauncherZoneInput, 1);
	});

});

describe.only('LCHLauncherPromptText', function testLCHLauncherPromptText() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it.skip('on startup', function() {
	});

});

describe.skip('LCHLauncherPromptInteraction', function testLCHLauncherPromptInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it.skip('on startup', function() {
	});

});
