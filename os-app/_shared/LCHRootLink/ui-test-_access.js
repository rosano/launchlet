import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHRootLink: '.LCHRootLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHRootLink_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows LCHRootLink', function() {
		browser.assert.elements(LCHRootLink, 1);
	});

});
