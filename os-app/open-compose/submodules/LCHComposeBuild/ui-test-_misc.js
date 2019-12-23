import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuild_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeBuildRunLink: 'alfa',
		});
	});

	describe('LCHComposeBuildRunLink', function testLCHComposeBuildRunLink () {

		it('sets href', function () {
			browser.assert.attribute(LCHComposeBuildRunLink, 'href', 'alfa');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(LCHComposeBuildRunLink, 'accesskey', 'r');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeBuildDispatchRun', '0');
			});

			before(function () {
				return browser.click(LCHComposeBuildRunLink);
			});
	
			it('sends LCHComposeBuildDispatchRun', function () {
				browser.assert.text('#TestLCHComposeBuildDispatchRun', '1');
			});
	
		});

	});

	describe('LCHComposeBuildPipeModeEnabledField', function test_LCHComposeBuildPipeModeEnabledField() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeBuildRunLink: 'alfa',
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeBuildPipeModeEnabledField, 'type', 'checkbox');
		});

		context('false', function () {
			
			it('binds LCHComposeBuildPipeModeEnabled', function () {
				deepEqual(browser.query(LCHComposeBuildPipeModeEnabledField).checked, false);
			});
			
		});

		context('true', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					LCHComposeBuildRunLink: 'alfa',
					LCHComposeBuildPipeModeEnabled: true,
				});
			});

			it('binds LCHComposeBuildPipeModeEnabled', function () {
				deepEqual(browser.query(LCHComposeBuildPipeModeEnabledField).checked, true);
			});
		
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeBuildDispatchPipeModeEnabled', '0');
			});

			before(function () {
				browser.assert.text('#TestLCHComposeBuildDispatchPipeModeEnabledData', 'undefined');
			});

			before(function () {
				return browser.uncheck(LCHComposeBuildPipeModeEnabledField);
			});

			it('sends LCHComposeBuildDispatchPipeModeEnabled', function () {
				browser.assert.text('#TestLCHComposeBuildDispatchPipeModeEnabled', '1');
			});

			it('sends LCHComposeBuildDispatchPipeModeEnabledData', function () {
				browser.assert.text('#TestLCHComposeBuildDispatchPipeModeEnabledData', 'false');
			});
		
		});

	});

	describe('LCHComposeBuildPageRecipesEnabledField', function test_LCHComposeBuildPageRecipesEnabledField() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeBuildRunLink: 'alfa',
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeBuildPageRecipesEnabledField, 'type', 'checkbox');
		});

		context('false', function () {
			
			it('binds LCHComposeBuildPageRecipesEnabled', function () {
				deepEqual(browser.query(LCHComposeBuildPageRecipesEnabledField).checked, false);
			});
			
		});

		context('true', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					LCHComposeBuildRunLink: 'alfa',
					LCHComposeBuildPageRecipesEnabled: true,
				});
			});

			it('binds LCHComposeBuildPageRecipesEnabled', function () {
				deepEqual(browser.query(LCHComposeBuildPageRecipesEnabledField).checked, true);
			});
		
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeBuildDispatchPageRecipesEnabled', '0');
			});

			before(function () {
				browser.assert.text('#TestLCHComposeBuildDispatchPageRecipesEnabledData', 'undefined');
			});

			before(function () {
				return browser.uncheck(LCHComposeBuildPageRecipesEnabledField);
			});

			it('sends LCHComposeBuildDispatchPageRecipesEnabled', function () {
				browser.assert.text('#TestLCHComposeBuildDispatchPageRecipesEnabled', '1');
			});

			it('sends LCHComposeBuildDispatchPageRecipesEnabledData', function () {
				browser.assert.text('#TestLCHComposeBuildDispatchPageRecipesEnabledData', 'false');
			});
		
		});

	});

});
