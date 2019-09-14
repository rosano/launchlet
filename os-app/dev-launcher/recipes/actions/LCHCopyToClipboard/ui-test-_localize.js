import { deepEqual } from 'assert';

const kDefaultRoutePath = '/launcher?loadRecipes=actions/LCHCopyToClipboard';

describe('LCHCopyToClipboardLanguage', function () {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(kDefaultRoutePath);
			});

			it('on run', async function() {
				browser.fill(LCHLauncherFilterInput, 'LCHCopyToClipboardTest');
				await browser.wait({element: LCHLauncherListItem});

				browser.click(LCHLauncherListItem);
				await browser.wait({element: LCHCopyToClipboardButton});

				deepEqual(browser.query(LCHCopyToClipboardButton).textContent, uLocalized('LCHCopyToClipboardButtonText'));
			});

		});
		
	});
});
