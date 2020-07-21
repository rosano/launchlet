const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxr_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
});
