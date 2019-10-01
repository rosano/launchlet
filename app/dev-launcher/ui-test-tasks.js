import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LRTOptionRunTasks', function testLRTOptionRunTasks () {

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
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify([uStubItem()]),
			}));
		});

		it('runs no callback', function () {
			browser.assert.input('.TestRecipeOutput', '');	
		});
	
	});

	context('enabled', function () {
		
		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				StubRecipes: uStubStringify([uStubItem()]),
				LRTOptionRunTasks: true,
			}));
		});

		it('runs callback', function () {
			browser.assert.input('.TestRecipeOutput', 'alfa');	
		});
	
	});

});
