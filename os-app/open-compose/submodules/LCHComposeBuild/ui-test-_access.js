const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeBuild: '.LCHComposeBuild',
	
	LCHComposeBuildRunLink: '.LCHComposeBuildRunLink',

	LCHComposeBuildPipeModeEnabledField: '.LCHComposeBuildPipeModeEnabledField',
	LCHComposeBuildPipeModeEnabledFieldLabel: '.LCHComposeBuildPipeModeEnabledFieldLabel',

	LCHComposeBuildPageRecipesEnabledField: '.LCHComposeBuildPageRecipesEnabledField',
	LCHComposeBuildPageRecipesEnabledFieldLabel: '.LCHComposeBuildPageRecipesEnabledFieldLabel',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeBuild_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeBuildRunLink: 'alfa',
		});
	});

	it('shows LCHComposeBuild', function () {
		browser.assert.elements(LCHComposeBuild, 1);
	});

	it('shows LCHComposeBuildRunLink', function () {
		browser.assert.elements(LCHComposeBuildRunLink, 1);
	});

	it('shows LCHComposeBuildPipeModeEnabledField', function () {
		browser.assert.elements(LCHComposeBuildPipeModeEnabledField, 1);
	});

	it('shows LCHComposeBuildPipeModeEnabledFieldLabel', function () {
		browser.assert.elements(LCHComposeBuildPipeModeEnabledFieldLabel, 1);
	});

	it('shows LCHComposeBuildPageRecipesEnabledField', function () {
		browser.assert.elements(LCHComposeBuildPageRecipesEnabledField, 1);
	});

	it('shows LCHComposeBuildPageRecipesEnabledFieldLabel', function () {
		browser.assert.elements(LCHComposeBuildPageRecipesEnabledFieldLabel, 1);
	});

});
