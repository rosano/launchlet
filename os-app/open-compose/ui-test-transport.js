const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Transport', function () {	

	const json = {};

	describe('OLSKTransportDispatchImportJSON', function test_OLSKTransportDispatchImportJSON() {

		const LCHDocumentName = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKTransportLauncherFakeItemImportSerialized');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				dialog.response = JSON.stringify({
					LCHDocument: [StubDocumentObjectValid({
						LCHDocumentName,
					})],
					LCHSetting: [StubSettingObjectValid()],
				});

				Object.assign(json, JSON.parse(dialog.response));

				return dialog;
			});
		});

		it('creates document', function () {
			browser.assert.text('.LCHComposeListItemTitle', LCHDocumentName);
		});

	});

	describe('OLSKTransportDispatchExportInput', function test_OLSKTransportDispatchExportInput() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKTransportLauncherFakeItemExportSerialized');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: json,
    	});
    });

	});

});
