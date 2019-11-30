import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherPipeItem: '.LCHLauncherPipeItem',
	LCHLauncherPipeItemTitle: '.LCHLauncherPipeItemTitle',
	LCHLauncherPipeItemSubtitle: '.LCHLauncherPipeItemSubtitle',
	LCHLauncherPipeItemSource: '.LCHLauncherPipeItemSource',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherPipeItem_Access', function () {

	const uStubProps = function () {
		return {
			PipeItemTitle: 'alfa',
			PipeItemSubtitle: 'bravo',
			PipeItemSource: 'charlie',
		};
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, uStubProps())
	});
	
	it('shows LCHLauncherPipeItem', function () {
		browser.assert.element(LCHLauncherPipeItem);
	});
	
	it('shows LCHLauncherPipeItemTitle', function () {
		browser.assert.element(LCHLauncherPipeItemTitle);
	});
	
	it('shows LCHLauncherPipeItemSubtitle', function () {
		browser.assert.element(LCHLauncherPipeItemSubtitle);
	});
	
	it('shows LCHLauncherPipeItemSource', function () {
		browser.assert.element(LCHLauncherPipeItemSource);
	});

});
