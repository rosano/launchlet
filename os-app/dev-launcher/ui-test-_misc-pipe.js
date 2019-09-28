import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguages[0]);
};

describe('LCHLauncherMisc_Pipe', function testLCHLauncherMisc_Pipe() {	

	describe('Enter', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'LPKModePipe',
			}));
		});

		before(function() {
			browser.assert.input('.TestRecipeOutput', '');	
		});

		it('assert callbacks count 0')

		context('input not valid', function () {
			
			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('runs no callback', function() {
				browser.assert.input('.TestRecipeOutput', '');
			});
		
		});

		context('input valid', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'a');
			});

			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('runs callback', function() {
				browser.assert.input('.TestRecipeOutput', 'alfa');
			});

			it('hides LCHLauncher', function() {
				browser.assert.elements(LCHLauncher, 0);
			});

			it('! runs callback once', function() {
				browser.assert.elements('.TestLauncherDidFinish', 1);
			});
		
		});

	});

	describe('keydown', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'LPKModePipe',
			}));
		});

		before(function () {
			browser.assert.elements(LCHLauncher)

			browser.evaluate(`let item = document.createElement('input'); item.classList.add('TestKeydownBubble'); document.body.appendChild(item); item.focus();`)
			// browser.assert.hasFocus('.TestKeydownBubble')
			
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		it('hides LCHLauncherSubjectPromptPlaceholder', function () {
			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);
		});

		it('shows first subject match', function() {
			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
		});

		it('shows first subject match', function() {
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
		});
	
		it('hides LCHLauncherResultList', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

		context('throttle', function () {

			before(function () {
				return browser.wait({ element: LCHLauncherResultList });
			});
			
			it('shows LCHLauncherResultList', function() {
				browser.assert.elements(LCHLauncherResultList, 1);
			});

			it('selects first list item', function() {
				browser.assert.hasClass(`${ LCHLauncherResultListItem }:first-child`, 'LCHLauncherResultListItemSelected');
			});
		
		});

		context('after throttle', function() {

			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');

				return browser.OLSKFireKeyboardEvent(browser.window, 'b');
			});

			before(function () {
				browser.assert.text(LCHLauncherActionPromptHeading, 'B');

				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');

				browser.OLSKFireKeyboardEvent(browser.window, 'c');
			});
			
			it('sets LCHLauncherSubjectPromptHeading', function() {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'C');
			});
			
			it('sets LCHLauncherActionPromptHeading', function() {
				browser.assert.text(LCHLauncherActionPromptHeading, uLocalized('LCHLauncherActionPromptHeadingText'));
			});

		});
			
		it('prevents keydown from bubbling', function() {
			browser.assert.input('.TestKeydownBubble', '');
		});

	});

	describe('MatchStop', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'LPKModePipe',
			}));
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
			
		before(function() {
			browser.assert.hasNoClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'x');
		});

		it('sets class', function() {
			browser.assert.hasClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
		});

		it('shows LCHLauncherResultList', function() {
			browser.assert.elements(LCHLauncherResultList, 1);
		});

		context('throttle', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'x');
			});

			it('sets filter', function () {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'AXX');
			});

			it('shows LCHLauncherResultList', function() {
				browser.assert.elements(LCHLauncherResultList, 1);
			});
		
		});

		context('after throttle', function () {
			
			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
			});

			it('sets filter', function () {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
			});

			it('sets class', function() {
				browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 0);
			});

			it('hides LCHLauncherResultList', function() {
				browser.assert.elements(LCHLauncherResultList, 0);
			});
		
		});
		
	});

	describe('SubjectContainer', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'LPKModePipe',
			}));
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'd');
		});
			
		before(function() {
			browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, 'Active Document Focus Elements'); // #localize
		});

		it('shows action', function() {
			browser.assert.text(LCHLauncherActionPromptItemSelected, 'Show Contents'); // #localize
		});

		context('execute', function () {
			
			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('reloads subjects', async function() {
				browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemTitle}`, 'TestLauncherInvoke');
			});
		
		});
		
	});

	describe('keydown', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'LPKModePipe',
			}));
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		it('sets LCHLauncherSubjectPromptHeading', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
		});
		
	});

	describe('Escape', function() {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'LPKModePipe',
			}));
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		before(function() {
			browser.assert.elements(LCHLauncherResultList, 1);
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides LCHLauncherResultList', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides LCHLauncher', function() {
			browser.assert.elements(LCHLauncher, 0);
		});

	});

	context('Tab', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				runMode: 'LPKModePipe',
			}));
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			browser.assert.elements(LCHLauncherResultList, 1);
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});
		
		it('hides open result list', function() {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

	});
	
});
