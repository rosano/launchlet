import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHGuide: '.LCHGuide',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHGuide_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHGuide', function () {
		browser.assert.elements(LCHGuide, 1);
	});

	it('shows LCHRootLink', function () {
		browser.assert.elements('.LCHRootLink', 1);
	});

});
