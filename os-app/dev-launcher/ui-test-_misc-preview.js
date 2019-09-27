import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherMisc_Preview', function testLCHLauncherMisc_Preview() {	

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			runMode: 'kRunModePreview',
		}));
	});

	before(function() {
		browser.assert.input('.TestRecipeOutput', '');	
	});

	it('assert callbacks count 0')

	before('shows items', function() {
		browser.assert.elements(LCHLauncherListItem, 2);
	});

	it('selects no items', async function() {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
	});

	describe('filter', function () {

		context('match', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			it('shows matching items', function() {
				browser.assert.elements(LCHLauncherListItem, 2);
			});

			it('selects first item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
			});

			it('assert callbacks count 1')

			it('runs callback', function() {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
		
		});

		context('match update', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'al');
			});
			
			it('shows matching items', function() {
				browser.assert.elements(LCHLauncherListItem, 1);
			});

			it('assert callbacks count 2/3')

			it('runs callback', function() {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
		
		});
		
		context('no match', function () {
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'alb');
			});
			
			it('shows no items', function() {
				browser.assert.elements(LCHLauncherListItem, 0);
			});

			it('assert callbacks count ?')

			it('runs last match callback', function() {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
		
		});

	});

	describe('results', function () {

		before(function() {
			browser.fill(LCHLauncherFilterInput, 'a');
		});

		context('ArrowDown', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('selects next item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');
			});
			
			it('runs callback', function () {
				browser.assert.input('.TestRecipeOutput', 'bravo');	
			});
		
		});

		context('ArrowUp', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			it('selects previous item', function() {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
			});
			
			it('runs callback', function () {
				browser.assert.input('.TestRecipeOutput', 'alfa');
			});
		
		});

		it('mouseover')
		context.skip('mouseover', function () {

			before(function () {
				return browser.fire(`${ LCHLauncherListItem }:nth-child(2)`, 'mouseover');
			});
			
			it('sets class', function () {
				browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');	
			});
			
			it('runs no callback', function () {
				browser.assert.input('.TestRecipeOutput', 'alfa');	
			});
		
		});

		context('click', function () {

			before(function () {
				return browser.fire(`${ LCHLauncherListItem }:nth-child(2)`, 'click');
			});

			it('assert callbacks count ?')
			
			it('assert sends did complete')
			
			it('hides LCHLauncher', function () {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

		context('Enter', function () {

			before(function () {
				return browser.pressButton('.TestLauncherInvoke');
			});
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('assert callbacks count ?')
			
			it('runs callback', function () {
				browser.assert.input('textarea', 'alfa');	
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

		context('Escape filter', function () {

			before(function () {
				return browser.pressButton('.TestLauncherInvoke');
			});
			
			before(function() {
				browser.fill(LCHLauncherFilterInput, 'a');
			});
			
			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('clears filter', function() {
				browser.assert.input(LCHLauncherFilterInput, '');
			});
		
		});

		context('Escape no filter', function () {

			before(function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('hides LCHLauncher', function() {
				browser.assert.elements(LCHLauncher, 0);
			});
		
		});

	});
	
});
