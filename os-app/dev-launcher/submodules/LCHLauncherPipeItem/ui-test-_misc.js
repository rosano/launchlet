const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPipeItem_Misc', function () {

	const uStubProps = function () {
		return {
			PipeItemTitle: 'alfa',
			PipeItemSubtitle: 'bravo',
			PipeItemSource: 'charlie',
			PipeItemSignature: 'delta',
		};
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, uStubProps())
	});
	
	it('binds PipeItemTitle', function() {
		browser.assert.text(LCHLauncherPipeItemTitle, uStubProps().PipeItemTitle);
	});
	
	it('binds PipeItemSubtitle', function() {
		browser.assert.text(LCHLauncherPipeItemSubtitle, uStubProps().PipeItemSubtitle);
	});
	
	it('binds PipeItemSource', function() {
		browser.assert.text(LCHLauncherPipeItemSource, uStubProps().PipeItemSource);
	});

	it('classes PipeItemSignature', function () {
		browser.assert.hasClass(LCHLauncherPipeItem, 'delta');
	});

});
