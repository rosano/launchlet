import { deepEqual } from 'assert';
const kDefaultRoutePath = '/stubs/LCHLauncherResultList';

const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';
const LCHLauncherResultListEmpty = '.LCHLauncherResultListEmpty';

describe('LCHLauncherResultListUILanguage', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('on startup', function() {
		browser.assert.text(LCHLauncherResultListEmpty, 'TestItemsZero');
	});

});