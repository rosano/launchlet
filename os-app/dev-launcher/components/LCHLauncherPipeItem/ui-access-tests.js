import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/components/LCHLauncherPipeItem';

const LCHLauncherPipeItem = '.LCHLauncherPipeItem';
const LCHLauncherPipeItemTitle = '.LCHLauncherPipeItemTitle';
const LCHLauncherPipeItemSubtitle = '.LCHLauncherPipeItemSubtitle';
const LCHLauncherPipeItemSource = '.LCHLauncherPipeItemSource';

describe('LCHLauncherPipeItemUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherPipeItem, 1);
		browser.assert.elements(LCHLauncherPipeItemTitle, 1);
		browser.assert.elements(LCHLauncherPipeItemSubtitle, 1);
		browser.assert.elements(LCHLauncherPipeItemSource, 1);
	});

});
