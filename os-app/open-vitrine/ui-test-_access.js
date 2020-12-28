const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHVitrine: '.LCHVitrine',
	
	LCHVitrineManifest: 'link[rel="manifest"]',

	LCHVitrineCrown: '.LCHVitrineCrown',
	LCHVitrineCrownIcon: '.LCHVitrineCrownIcon',
	LCHVitrineCrownName: '.LCHVitrineCrownName',

	LCHVitrineFeaturesHeading: '.LCHVitrineFeaturesHeading',

	LCHVitrineVideoHeading: '.LCHVitrineVideoHeading',
	LCHVitrineVideo1: '.OLSKCommonVideoList .OLSKCommonVideoListItem.LCHVitrineVideo1 iframe',
	LCHVitrineVideo2: '.OLSKCommonVideoList .OLSKCommonVideoListItem.LCHVitrineVideo2 iframe',

	LCHVitrineSupportHeading: '.LCHVitrineSupportHeading',
	LCHVitrineSupportBlurb: '.LCHVitrineSupportBlurb',

	LCHVitrineDemoButtonCommit: '.LCHVitrineDemoButtonCommit',
	LCHVitrineDemoButtonPreview: '.LCHVitrineDemoButtonPreview',
	LCHVitrineDemoButtonPipe: '.LCHVitrineDemoButtonPipe',

	LCHVitrineBrueghel: '.LCHVitrineBrueghel',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHVitrine_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows LCHVitrine', function() {
		browser.assert.elements(LCHVitrine, 1)
	});

	it('shows LCHVitrineManifest', function () {
		browser.assert.elements(LCHVitrineManifest, 1);
	});
	
	it('shows OLSKLanguageSwitcher', function() {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});

	it('shows LCHVitrineCrown', function () {
		browser.assert.elements(LCHVitrineCrown, 1);
	});

	it('shows LCHVitrineCrownIcon', function () {
		browser.assert.elements(LCHVitrineCrownIcon, 1);
	});

	it('shows LCHVitrineCrownName', function () {
		browser.assert.elements(LCHVitrineCrownName, 1);
	});

	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows LCHVitrineFeaturesHeading', function () {
		browser.assert.elements(LCHVitrineFeaturesHeading, 1);
	});

	it('shows LCHFeatureList', function () {
		browser.assert.elements('.LCHFeatureList', 1);
	});

	it('shows OLSKAppFeatureList', function () {
		browser.assert.elements('.OLSKAppFeatureList', 1);
	});

	it('shows LCHVitrineVideoHeading', function () {
		browser.assert.elements(LCHVitrineVideoHeading, 1);
	});

	it('shows LCHVitrineVideo1', function () {
		browser.assert.elements(LCHVitrineVideo1, 1);
	});

	it('shows LCHVitrineVideo2', function () {
		browser.assert.elements(LCHVitrineVideo2, 1);
	});

	it('shows LCHVitrineSupportHeading', function () {
		browser.assert.elements(LCHVitrineSupportHeading, 1);
	});

	it('shows LCHVitrineSupportBlurb', function () {
		browser.assert.elements(LCHVitrineSupportBlurb, 1);
	});

	it('shows LCHVitrineDemoButtonCommit', function() {
		browser.assert.elements(LCHVitrineDemoButtonCommit, 1)
	});

	it('shows LCHVitrineDemoButtonPreview', function() {
		browser.assert.elements(LCHVitrineDemoButtonPreview, 1)
	});

	it('shows LCHVitrineDemoButtonPipe', function() {
		browser.assert.elements(LCHVitrineDemoButtonPipe, 1)
	});

	it('shows LCHVitrineBrueghel', function() {
		browser.assert.elements(LCHVitrineBrueghel, 1)
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1)
	});

});
