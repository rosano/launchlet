const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Transport', function () {	

	const LCHDocumentName = Math.random().toString();

	const json = [];

	describe('LCHComposeLauncherItemImportJSON', function test_LCHComposeLauncherItemImportJSON() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'LCHComposeLauncherItemDebug_PromptFakeImportSerialized');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				dialog.response = JSON.stringify({
					LCHDocument: [StubDocumentObjectValid({
						LCHDocumentID: Math.random().toString(),
						LCHDocumentName,
					})],
					LCHSetting: [StubSettingObjectValid({
						LCHSettingKey: Math.random().toString(),
						LCHSettingValue: Math.random().toString(),
					})],
				});

				json.push(dialog.response);

				return dialog;
			});
		});

		it('creates document', function () {
			browser.assert.text('.LCHComposeMasterListItemTitle', LCHDocumentName);
		});

	});

	describe('LCHComposeLauncherItemExportJSON', function test_LCHComposeLauncherItemExportJSON() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'LCHComposeLauncherItemDebug_AlertFakeExportSerialized');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertTextAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: JSON.parse(json.pop()),
    	});
    });

	});

});