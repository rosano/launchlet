import { deepEqual } from 'assert';

Object.entries({
	LCHRootLink: '.LCHRootLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

require('./controller.js').OLSKControllerRoutes().forEach(function (kDefaultRoute) {

	describe(`LCHRootLink_Access-${ kDefaultRoute.OLSKRouteSignature }`, function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('shows LCHRootLink', function() {
			browser.assert.elements(LCHRootLink, 1);
		});
		
		it('shows OLSKRootLink', function() {
			browser.assert.elements('.OLSKRootLink', 1);
		});
		
	});
	
});
