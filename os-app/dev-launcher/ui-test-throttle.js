import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.only('LCHLauncherThrottle', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));
	});	

	context('Tab', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});

		it('cancels throttle', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
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
		
		after(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});
	
	});	

	context('keydown after throttle', function() {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			return browser.OLSKFireKeyboardEvent(browser.window, 'b');
		});
		
		it('replaces filter', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'B');
		});

	});

});
