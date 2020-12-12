const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, 'en');
};

describe('LCHFeatureList_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	uLocalized('LCHFeatureListArray').forEach(function (e, i) {

		describe('LCHFeatureListItemIdentity', function test_LCHFeatureListItemIdentity () {
			
			it('sets src', function () {
				browser.assert.attribute(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemIcon`, 'src', [
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureCode.svg',
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureURL.svg',
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureExtension.svg',
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureBookmarklet.svg',
					][i]);
			});
			
			it('sets role', function () {
				browser.assert.attribute(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemIcon`, 'role', 'presentation');
			});

		});
		
	});

});
