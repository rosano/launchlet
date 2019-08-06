'use strict'
import { throws, deepEqual } from 'assert';

const Browser = require('zombie');

Browser.localhost('loc.tests', 3000);

const browser = new Browser();
const kDefaultRoutePath = '/modules/LCHLauncherZoneInput';
const LCHLauncherZoneInputText = '#LCHLauncherZoneInputText';

describe.only('LCHLauncherZoneInputDiscovery', function testLCHLauncherZoneInputDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherZoneInputText, 1);
	});

});
