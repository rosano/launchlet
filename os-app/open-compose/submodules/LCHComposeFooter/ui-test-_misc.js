import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeFooter_Misc', function () {


	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('LCHComposeFooter', function test_LCHComposeFooter () {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(LCHComposeFooter, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(LCHComposeFooter, 'OLSKToolbarJustify');
		});

	});

	describe('LCHComposeFooterGuideLink', function test_LCHComposeFooterGuideLink () {

		it('sets href', function () {
			browser.assert.attribute(LCHComposeFooterGuideLink, 'href', require('../../../open-guide/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});

		it('sets target', function () {
			browser.assert.attribute(LCHComposeFooterGuideLink, 'target', '_blank');
		});

	});

	describe('LCHComposeFooterDonateLink', function test_LCHComposeFooterDonateLink () {

		it('sets href', function () {
			browser.assert.attribute(LCHComposeFooterDonateLink, 'href', process.env.LCH_SHARED_DONATE_URL);
		});

		it('sets target', function () {
			browser.assert.attribute(LCHComposeFooterDonateLink, 'target', '_blank');
		});

	});

	describe('LCHComposeFooterStorageStatus', function test_LCHComposeFooterStorageStatus () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeFooterStorageStatus: 'alfa',
			});
		});

		it('sets text', function () {
			browser.assert.text(LCHComposeFooterStorageStatus, 'alfa');
		});

	});

	describe('LCHComposeFooterStorageButton', function test_LCHComposeFooterStorageButton () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(LCHComposeFooterStorageButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(LCHComposeFooterStorageButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(LCHComposeFooterStorageButton, 'OLSKToolbarButton');
		});
	
		context('click', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeFooterDispatchStorage', '0');
			});

			before(function () {
				browser.click(LCHComposeFooterStorageButton);
			});
	
			it('sends LCHComposeFooterDispatchStorage', function () {
				browser.assert.text('#TestLCHComposeFooterDispatchStorage', '1');
			});
	
		});

	});

	describe('LCHComposeFooterStorageButtonImage', function test_LCHComposeFooterStorageButtonImage () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
	
		it('sets src', function () {
			browser.assert.elements(`${ LCHComposeFooterStorageButtonImage } #_OLSKSharedCloud`, 1);
		});

	});

});
