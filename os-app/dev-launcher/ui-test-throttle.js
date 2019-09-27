import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.only('LCHLauncherThrottle', function () {

	before(function () {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			runMode: 'kRunModePipe',
		}));
	});

	before(function () {
		browser.OLSKFireKeyboardEvent(browser.window, 'a');
	});

	context('Tab', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});

		it('cancels throttle', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');

			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
	
	});

	context('DotMode', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, '.');
		});
		
		it('cancels throttle', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});
		
		after(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
	
	});	

	context('keydown after throttle', function() {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			return browser.OLSKFireKeyboardEvent(browser.window, 'b');
		});
		
		it('replaces filter', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'B');
		});

	});

	context('ArrowDown', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('skips throttle', function() {
			browser.assert.elements(LCHLauncherResultList, 1);
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		})

	});

	context('ArrowUp', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('skips throttle', function() {
			browser.assert.elements(LCHLauncherResultList, 1);
		});
	
	});

});
