import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHRecipeIsHidden', function testLCHRecipeIsHidden () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {}, // #purge-callback
				LCHRecipeIsHidden: function () {
					return document.querySelector('.TestRecipeOutput').value !== 'bravo';
				},
			}]),
		}));
	});

	context('no match', function () {

		before(function() {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('hides item', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
	
	});

	context('match', function () {
		
		before(function() {
			browser.fill('.TestRecipeOutput', 'bravo');
		});

		before(function() {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('shows item', function() {
			browser.assert.elements(LCHLauncherListItem, 1);
		});
	
	});

});

describe('LCHRecipeURLFilter', function testLCHRecipeURLFilter () {

	const StubRecipes = uStubStringify([{
		LCHRecipeName: 'alfa',
		LCHRecipeCallback: function () {
			document.querySelector('.TestRecipeOutput').value = 'bravo';
		},
		LCHRecipeURLFilter: '/\\d{5}/',
	}]);

	context('no match', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes,
			}));
		});
		
		before(function() {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('hides item', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
	
	});

	context('match', function () {
		
		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes,
				charlie: '12345',
			}));
		});
		
		before(function() {
			browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('shows item', function() {
			browser.assert.elements(LCHLauncherListItem, 1);
		});
	
	});

});

describe('LCHRecipeIsAutomatic', function testLCHRecipeIsAutomatic () {

	const StubRecipes = uStubStringify([{
		LCHRecipeName: 'alfa',
		LCHRecipeCallback: function () {
			document.querySelector('.TestRecipeOutput').value = 'bravo';
		},
		LCHRecipeURLFilter: '/\\d{5}/',
		LCHRecipeIsAutomatic: true,
	}]);

	context('no match', function () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes,
			}));
		});

		it('runs no callback', function() {
			browser.assert.input('.TestRecipeOutput', '');
		});
	
	});

	context('match', function () {
		
		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes,
				charlie: '12345',
			}));
		});
		
		before(function() {
			browser.fill(LCHLauncherFilterInput, 'LCHRecipeURLFilter');
		});

		it('runs callback', function() {
			browser.assert.input('.TestRecipeOutput', 'bravo');
		});
	
	});

});

describe('LCHRecipeStyle', function testLCHRecipeStyle () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeStyle: 'body { background: red; }',
				LCHRecipeCallback: function () {}, // #purge-callback
			}]),
		}));
	});

	before(function () {
		browser.assert.elements('body style', 0);
	});

	before(function () {
		return browser.fill(LCHLauncherFilterInput, 'alfa');
	});

	before(function() {
		browser.click(LCHLauncherListItem);
	});

	it('inserts style element', function() {
		browser.assert.elements('body style', 1);
	});

	it('inserts style element', function() {
		browser.assert.text('body style', 'body { background: red; }');
	});

});