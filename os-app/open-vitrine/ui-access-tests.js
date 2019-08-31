import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute.OLSKRoutePath;

Object.entries({
	RCSLanguageSwitcher: '#RCSLanguageSwitcher',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHVitrineUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	context('Startup', function testStartup() {

		it('shows RCSLanguageSwitcher', async function() {
			browser.assert.elements(RCSLanguageSwitcher, 1)
		});
		
	});

});
