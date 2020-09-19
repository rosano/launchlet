const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeTools: '.LCHComposeTools',

	LCHComposeToolsPairButton: '.LCHComposeToolsPairButton',
	LCHComposeToolsPairStatusWaiting: '.LCHComposeToolsPairStatusWaiting',
	LCHComposeToolsPairStatusFailed: '.LCHComposeToolsPairStatusFailed',
	LCHComposeToolsPairStatusFailedError: '.LCHComposeToolsPairStatusFailedError',

	LCHComposeViewportFooter: '.LCHComposeViewportFooter',

	LCHComposeStorageToolbar: '.LCHComposeStorageToolbar',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHCompose_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHComposeMaster', function () {
		browser.assert.elements('.LCHComposeMaster', 1);
	});

	it('hides LCHComposeMasterListItem', function () {
		browser.assert.elements('.LCHComposeMasterListItem', 0);
	});

	it('shows LCHComposeDetail', function () {
		browser.assert.elements('.LCHComposeDetail', 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('shows LCHComposeTools', function () {
		browser.assert.elements(LCHComposeTools, 1);
	});

	it('shows LCHComposeTools', function () {
		browser.assert.elements('.LCHComposeTools', 1);
	});

	it('shows LCHComposeToolsPairButton', function () {
		browser.assert.elements(LCHComposeToolsPairButton, 1);
	});

	it('hides LCHComposeToolsPairStatusWaiting', function () {
		browser.assert.elements(LCHComposeToolsPairStatusWaiting, 0);
	});

	it('hides LCHComposeToolsPairStatusFailed', function () {
		browser.assert.elements(LCHComposeToolsPairStatusFailed, 0);
	});

	it('hides LCHComposeToolsPairStatusFailedError', function () {
		browser.assert.elements(LCHComposeToolsPairStatusFailedError, 0);
	});

	it('hides LCHComposePair', function () {
		browser.assert.elements('.LCHComposePair', 0);
	});

	it('shows LCHComposeViewportFooter', function () {
		browser.assert.elements(LCHComposeViewportFooter, 1);
	});

	it('hides LCHComposeStorageToolbar', function () {
		browser.assert.elements(LCHComposeStorageToolbar, 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows OLSKRemoteStorageLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKRemoteStorageLauncherFakeItemProxy', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	it('hides LCHComposeLauncherItemClone', function () {
		return browser.assert.OLSKLauncherItems('LCHComposeLauncherItemClone', 0);
	});

	context('click OLSKAppToolbarStorageButton', function () {
		
		before(function () {
			return browser.pressButton('.OLSKAppToolbarStorageButton');
		});

		it('shows LCHComposeStorageToolbar', function () {
			browser.assert.elements(LCHComposeStorageToolbar, 1);
		});

		it('shows OLSKStorageWidget', function () {
			browser.assert.elements('.OLSKStorageWidget', 1);
		});
	
	});

	describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		it('shows LCHLauncher', function() {
			browser.assert.elements('.LCHLauncher', 1);
		});

		context('AltSpace', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Space', {
					altKey: true,
				});
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements('.LCHLauncher', 0);
			});

		});

	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		it('shows LCHComposeMasterListItem', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});
	
	});

	context('select', function test_select () {
		
		it('shows LCHComposeLauncherItemClone', function () {
			return browser.assert.OLSKLauncherItems('LCHComposeLauncherItemClone', 1);
		});
	
	});

	context('back', function test_back () {
		
		before(function () {
			return browser.pressButton('.LCHComposeDetailToolbarBackButton');
		});

		// it('shows OLSKDetailPlaceholder', function () {
		// 	browser.assert.elements('.OLSKDetailPlaceholder', 1);
		// });
	
	});

	context('click_LCHComposeMasterListItem', function test_click_LCHComposeMasterListItem () {
		
		before(function () {
			return browser.click('.LCHComposeMasterListItem');
		});

		it('shows LCHComposeMasterListItem', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});
	
	});

	context('discard', function test_discard () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('hides OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
				});
			});

			it('hides LCHComposeMasterListItem', function () {
				browser.assert.elements('.LCHComposeMasterListItem', 0);
			});

			it('shows OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});
		
		});
		
	});

	context('LCHComposeToolsPairButton', function () {
		
		context('click', function () {
			
			before(function () {
				return browser.pressButton('.LCHComposeToolsPairButton');
			});

			it('hides LCHComposeToolsPairButton', function () {
				browser.assert.elements(LCHComposeToolsPairButton, 0);
			});

			it('shows LCHComposeToolsPairStatusWaiting', function () {
				browser.assert.elements(LCHComposeToolsPairStatusWaiting, 1);
			});

			it('shows LCHComposePair', function () {
				browser.assert.elements('.LCHComposePair', 1);
			});
		
		});

		context('TestLCHComposeToolsPairIsVisible', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					TestLCHComposeToolsPairIsVisible: true,
				});
			});

			it('hides LCHComposeToolsPairButton', function () {
				browser.assert.elements(LCHComposeToolsPairButton, 0);
			});

			it('shows LCHComposeToolsPairStatusWaiting', function () {
				browser.assert.elements(LCHComposeToolsPairStatusWaiting, 1);
			});

			it('shows LCHComposePair', function () {
				browser.assert.elements('.LCHComposePair', 1);
			});
		
		});

		context('TestLCHComposePairDidFail', function () {
			
			before(function () {
				browser.evaluate(`window.postMessage({
					LBXResponseHash: 'alfa',
				}, window.location.href)`);
			});
			
			it('hides LCHComposeToolsPairStatusWaiting', function () {
				browser.assert.elements(LCHComposeToolsPairStatusWaiting, 0);
			});

			it('shows LCHComposeToolsPairStatusFailed', function () {
				browser.assert.elements(LCHComposeToolsPairStatusFailed, 1);
			});

			it('shows LCHComposeToolsPairStatusFailedError', function () {
				browser.assert.elements(LCHComposeToolsPairStatusFailedError, 1);
			});
		
		});
	
	});

});
