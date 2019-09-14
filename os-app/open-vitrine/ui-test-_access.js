import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute.OLSKRoutePath;

Object.entries({
	RCSLanguageSwitcher: '#RCSLanguageSwitcher',

	LCHVitrineDemoButtonCommit: '.LCHVitrineDemoButtonCommit',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHVitrineAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	context('Startup', function testStartup() {

		it('shows RCSLanguageSwitcher', function() {
			browser.assert.elements(RCSLanguageSwitcher, 1)
		});

		it('shows LCHVitrineDemoButtonCommit', function() {
			browser.assert.elements(LCHVitrineDemoButtonCommit, 1)
		});
		
	});

});
