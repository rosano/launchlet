import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHVitrineDemoPreview', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.click(LCHVitrineDemoButtonPreview);
	});
	
	it('shows headings', function () {
		deepEqual(browser.queryAll('h1,h2').map(function (e) {
			return e.textContent;
		}), browser.queryAll('.OLSKResultsListItem').map(function (e) {
			return e.textContent.trim();
		}));
	});
	
	it('selects one', function () {
		browser.assert.elements('.OLSKResultsListItemSelected', 1);
	});

});
