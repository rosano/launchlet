import { deepEqual } from 'assert';

const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKReloadButton: '.OLSKReloadButton',

	RCSLanguageSwitcher: '#RCSLanguageSwitcher',
	LCHComposeFooterGuideLink: '.LCHComposeFooterGuideLink',
	LCHComposeFooterDonateLink: '.LCHComposeFooterDonateLink',
	
	LCHComposeFooterStorageStatus: '.LCHComposeFooterStorageStatus',
	LCHComposeFooterStorageButton: '.LCHComposeFooterStorageButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeFooter_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(OLSKReloadButton, 1);
		
		browser.assert.elements(RCSLanguageSwitcher, 1);
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
