import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHOptionRunAutomaticRecipes', function test_LCHOptionRunAutomaticRecipes () {

	const uStubItem = function () {
		return {
			LCHRecipeCallback: function () {
				return document.querySelector('.TestRecipeOutput').value = 'alfa';
			},
			LCHRecipeURLFilter: '*',
			LCHRecipeIsAutomatic: true,
		};
	};

	context('not enabled', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify([uStubItem()]),
			});
		});

		it('runs no callback', function () {
			browser.assert.input('.TestRecipeOutput', '');	
		});
	
	});

	context('enabled', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify([uStubItem()]),
				LCHOptionRunAutomaticRecipes: true,
			});
		});

		it('runs callback', function () {
			browser.assert.input('.TestRecipeOutput', 'alfa');	
		});
	
	});

});
