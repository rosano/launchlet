const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguageCodes[0]);
};

describe('LCHLauncherDotMode', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHOptionMode: 'LCHModePipe',
		});
	});

	before(function () {
		browser.OLSKFireKeyboardEvent(browser.window, '.');
	});

	it('hides LCHLauncherSubjectPromptPlaceholder', function() {
		browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);
	});
			
	it('shows LCHLauncherPromptDotModeInput', function() {
		browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
	});
			
	it('sets autofocus', function() {
		browser.assert.attribute(LCHLauncherPromptDotModeInput, 'autofocus', '');
	});

	it('focuses LCHLauncherPromptDotModeInput', function() {
		browser.assert.hasFocus(LCHLauncherPromptDotModeInput)
	});

	it('hides LCHLauncherActionPromptItemSelected', function() {
		browser.assert.elements(LCHLauncherActionPromptItemSelected, 0);
	});

	context('Escape', function () {
		
		context('input not valid', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});
			
			it('hides LCHLauncherPromptDotModeInput', function() {
				browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
			});
				
			it('shows LCHLauncherSubjectPromptPlaceholder', function() {
				browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
			});
		
		});
			
		context('input valid', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, '.');
			});
			
			before(function () {
				browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});
			
			it('hides LCHLauncherPromptDotModeInput', function() {
				browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
			});
			
			it('shows LCHLauncherSubjectPromptItemSelected', function() {
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
			});
			
			it('sets text', function() {
				browser.assert.elements(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, 'alfa');
			});
		
		});

		context('re-entry', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, '.');
			});
			
			it('sets value', function() {
				browser.assert.input(LCHLauncherPromptDotModeInput, 'alfa');
			});

			it('shows LCHLauncherActionPromptItemSelected', function() {
				browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
			});

			after(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

		});

		context('re-entry after Backspace', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, '.');
			});
			
			it('sets value', function() {
				browser.assert.input(LCHLauncherPromptDotModeInput, '');
			});

			it('hides LCHLauncherActionPromptItemSelected', function() {
				browser.assert.elements(LCHLauncherActionPromptItemSelected, 0);
			});
		
		});
	
	});

	context('results visible', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');

			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
		
		before(function () {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
			browser.assert.elements('.OLSKResultsList', 1)
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, '.');
		});
		
		it('hides OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});

		it('clears filter text', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, uLocalized('LCHLauncherSubjectPromptHeadingText'));

		});

		it('shows LCHLauncherPromptDotModeInput', function() {
			browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
		});
	
	});
		
	context('input valid', function () {

		before(function () {
			return browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
		});

		it('shows LCHLauncherActionPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
		});
	
	});
		
	context('input url', function () {

		before(function () {
			return browser.fill(LCHLauncherPromptDotModeInput, 'https://example.com');
		});

		it('shows corresponding action', function() {
			browser.assert.text(LCHLauncherPipeItem, 'Open URL'); // #localize
		});
	
	});
		
	context('input not valid', function () {

		before(function () {
			return browser.fill(LCHLauncherPromptDotModeInput, '');
		});
		
		it('hides LCHLauncherActionPromptItemSelected', function() {
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 0);
		});
	
	});
		
	context('Tab', function () {

		context('input not valid', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});
			
			it('does nothing', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
				browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);
			});
		
		});

		context('input valid', function () {

			before(function () {
				browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});
			
			it('shows LCHLauncherSubjectPromptItemSelected', function() {
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
			});
			
			it('sets text', function() {
				browser.assert.elements(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, 'alfa');
			});

			it('selects LCHLauncherActionPrompt', function() {
				browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
			});
		
		});
		
		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			return browser.OLSKFireKeyboardEvent(browser.window, '.');
		});
	
	});
		
	context('Enter', function () {

		context('input not valid', function () {

			before(function () {
				browser.fill(LCHLauncherPromptDotModeInput, '');
				return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});
			
			it('hides LCHLauncherPromptDotModeInput', function() {
				browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
			});
				
			it('shows LCHLauncherSubjectPromptPlaceholder', function() {
				browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
			});
		
		});

		context('input valid', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, '.');
			});
			
			before(function () {
				browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
				return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			before(function () {
				return browser.click('.LCHCopyToClipboardButton');
			});
			
			it('executes composition', function() {
				browser.assert.elements('.TestLauncherDidFinish', 1);
			});
		
		});

		after(function () {
			return browser.pressButton('.TestLauncherInvoke');
		});
	
	});

	context('action prompt selected', function () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');;
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');;
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, '.');;
		});

		it('does nothing', function() {
			browser.assert.elements(LCHLauncherPipeItem, 2);
		});
	
	});

});
