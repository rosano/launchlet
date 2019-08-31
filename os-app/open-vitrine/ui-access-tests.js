import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute.OLSKRoutePath;

Object.entries({
	RCSLanguageSwitcher: '#RCSLanguageSwitcher',

	LCHVitrineDemoButtonCommit: '.LCHVitrineDemoButtonCommit',
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

		it('shows LCHVitrineDemoButtonCommit', async function() {
			browser.assert.elements(LCHVitrineDemoButtonCommit, 1)
		});
		
	});

});
