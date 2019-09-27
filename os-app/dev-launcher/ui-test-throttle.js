import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherThrottle', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));
	});	

	context('Tab', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});

		it('cancels throttle', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

		after(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});
	
	});

	context('DotMode', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			return browser.OLSKFireKeyboardEvent(browser.window, '.');
		});
		
		it('cancels throttle', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});
	
	});	

});
