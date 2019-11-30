import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPrompt', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			LCHOptionMode: 'LCHModePipe',
		});
	});

	it('selects first prompt', function() {
		browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
	});

	context('click', function () {

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
		
		before(function() {
			return browser.click(LCHLauncherActionPrompt);
		});

		it('selects prompt', function() {
			browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
		});
	
	});

	context('Tab', function () {

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});

		it('selects next prompt', function() {
			browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
		});
	
	});

	context('Shift+Tab', function () {

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
				shiftKey: true,
			});
		});

		it('selects previous prompt', function() {
			browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
		});
	
	});

	context('no subject', function () {

		before(function() {
			browser.click(LCHLauncherSubjectPrompt);
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
		});

		context('click', function () {
			
			before(function() {
				browser.click(LCHLauncherSubjectPrompt);
			});

			it('does nothing', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});
		
		});

		context('Tab', function () {

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('does nothing', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});
		
		});

		context('Shift+Tab', function () {

			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
					shiftKey: true,
				});
			});

			it('does nothing', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});
		
		});
	
	});

});
