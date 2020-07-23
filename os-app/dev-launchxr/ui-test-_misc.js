const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncher_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
});
