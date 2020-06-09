require('./controller.js').OLSKControllerRoutes().forEach(function (kDefaultRoute) {

	describe(`LCHRootLink_Misc--${ kDefaultRoute.OLSKRouteSignature }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		describe('OLSKRootLink', function () {
			
			it('sets OLSKRootLinkImageURL', function () {
				browser.assert.attribute('.OLSKRootLinkImage', 'src', '/_shared/LCHRootLink/ui-assets/identity.svg');
			});
		
		});

	});
	
});
