import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute.OLSKRoutePath;

Object.entries({
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHVitrineUILocalize', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	context('Startup', function testStartup() {

		it('renders content', async function() {
			browser.assert.text('#launchlet', 'Launchlet')
		});
		
	});

});
