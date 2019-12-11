import { deepEqual } from 'assert';

const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeFooterGuideLink: '.LCHComposeFooterGuideLink',
	LCHComposeFooterDonateLink: '.LCHComposeFooterDonateLink',
	
	LCHComposeFooterStorageStatus: '.LCHComposeFooterStorageStatus',
	LCHComposeFooterStorageButton: '.LCHComposeFooterStorageButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeFooter_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	it('shows OLSKReloadButton', function () {
		browser.assert.elements('.OLSKReloadButton', 1);
	});

	it('shows OLSKLanguageSwitcher', function () {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});

	it('shows LCHComposeFooterGuideLink', function () {
		browser.assert.elements(LCHComposeFooterGuideLink, 1)
	});

	it('shows LCHComposeFooterDonateLink', function () {
		browser.assert.elements(LCHComposeFooterDonateLink, 1)
	});

	it('shows LCHComposeFooterStorageStatus', function () {
		browser.assert.elements(LCHComposeFooterStorageStatus, 1)
	});

	it('shows LCHComposeFooterStorageButton', function () {
		browser.assert.elements(LCHComposeFooterStorageButton, 1)
	});

});
