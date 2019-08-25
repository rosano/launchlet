import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherPipeItem';

const LCHLauncherPipeItem = '.LCHLauncherPipeItem';
const LCHLauncherPipeItemTitle = '.LCHLauncherPipeItemTitle';
const LCHLauncherPipeItemSubtitle = '.LCHLauncherPipeItemSubtitle';

describe('LCHLauncherPipeItemDiscovery', function testLCHLauncherPipeItemDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherPipeItem, 1);
		browser.assert.elements(LCHLauncherPipeItemTitle, 1);
		browser.assert.elements(LCHLauncherPipeItemSubtitle, 1);
	});

});

describe('LCHLauncherPipeItemInteraction', function testLCHLauncherPipeItemInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('binds PipeItemTitle', function() {
		deepEqual(browser.query(LCHLauncherPipeItemTitle).textContent, 'StubPipeItemTitle');
	});
	
	it('binds PipeItemSubtitle', function() {
		deepEqual(browser.query(LCHLauncherPipeItemSubtitle).textContent, 'StubPipeItemSubtitle');
	});

});
