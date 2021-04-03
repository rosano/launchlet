const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHCompose: '.LCHCompose',
	
	LCHComposeCreateButton: '.LCHComposeCreateButton',
	LCHComposeCreateButtonImage: '.LCHComposeCreateButtonImage',
	
	LCHComposeTools: '.LCHComposeTools',

	LCHComposeToolsPairButton: '.LCHComposeToolsPairButton',
	LCHComposeToolsPairStatusWaiting: '.LCHComposeToolsPairStatusWaiting',
	LCHComposeToolsPairStatusFailed: '.LCHComposeToolsPairStatusFailed',
	LCHComposeToolsPairStatusFailedError: '.LCHComposeToolsPairStatusFailedError',

	LCHComposeViewportFooter: '.LCHComposeViewportFooter',

	LCHComposeCloudToolbar: '.LCHComposeCloudToolbar',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHCompose_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHCompose', function () {
		browser.assert.elements(LCHCompose, 1);
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
	});

	it('shows LCHComposeCreateButton', function () {
		browser.assert.elements(LCHComposeCreateButton, 1);
	});

	it('shows LCHComposeCreateButtonImage', function () {
		browser.assert.elements(LCHComposeCreateButtonImage, 1);
	});

	it('hides LCHComposeListItem', function () {
		browser.assert.elements('.LCHComposeListItem', 0);
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

	it('hides LCHComposeCloudToolbar', function () {
		browser.assert.elements(LCHComposeCloudToolbar, 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows OLSKAppToolbarAproposButton', function () {
		browser.assert.elements('.OLSKAppToolbarAproposButton', 1);
	});

	it('shows OLSKAppToolbarGuideLink', function () {
		browser.assert.elements('.OLSKAppToolbarGuideLink', 1);
	});

	it('shows OLSKAppToolbarFundButton', function () {
		browser.assert.elements('.OLSKAppToolbarFundButton', 1);
	});

	it('shows OLSKAppToolbarFundLimit', function () {
		browser.assert.elements('.OLSKAppToolbarFundLimit', 1);
	});

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows ZDRLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('ZDRLauncherFakeItemProxy', 1);
	});

	it('shows OLSKTransportLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKTransportLauncherFakeItemProxy', 1);
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

	describe('tongue', function test_tongue() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLanguageButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKLanguageSwitcherLauncherFakeItemProxy');
		});

		it('shows OLSKLanguageSwitcherLauncherFakeItemProxy', function () {
			browser.assert.elements('.LCHLauncherPipeItem', 1);
		});

		after(function () {
			browser.pressButton('#TestLCHDebugCloseButton');
		});

	});

	context('click OLSKAppToolbarCloudButton', function () {
		
		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('shows LCHComposeCloudToolbar', function () {
			browser.assert.elements(LCHComposeCloudToolbar, 1);
		});

		it('shows OLSKCloud', function () {
			browser.assert.elements('.OLSKCloud', 1);
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

	context('select', function test_select () {
		
		before(function () {
			return browser.pressButton('.LCHComposeCreateButton');
		});

		it('shows LCHComposeLauncherItemClone', function () {
			return browser.assert.OLSKLauncherItems('LCHComposeLauncherItemClone', 1);
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
