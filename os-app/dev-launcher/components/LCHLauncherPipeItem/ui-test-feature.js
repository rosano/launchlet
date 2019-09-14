import { deepEqual } from 'assert';

const kDefaultRoutePath = '/stubs/LCHLauncherPipeItem';

const LCHLauncherPipeItem = '.LCHLauncherPipeItem';
const LCHLauncherPipeItemTitle = '.LCHLauncherPipeItemTitle';
const LCHLauncherPipeItemSubtitle = '.LCHLauncherPipeItemSubtitle';
const LCHLauncherPipeItemSource = '.LCHLauncherPipeItemSource';

describe('LCHLauncherPipeItemFeature', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('binds PipeItemTitle', function() {
		deepEqual(browser.query(LCHLauncherPipeItemTitle).textContent, 'StubPipeItemTitle');
	});
	
	it('binds PipeItemSubtitle', function() {
		deepEqual(browser.query(LCHLauncherPipeItemSubtitle).textContent, 'StubPipeItemSubtitle');
	});
	
	it('binds PipeItemSource', function() {
		deepEqual(browser.query(LCHLauncherPipeItemSource).textContent, 'StubPipeItemSource');
	});

});
