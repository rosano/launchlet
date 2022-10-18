const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHVitrine: '.LCHVitrine',
	
	LCHVitrineFeaturesHeading: '.LCHVitrineFeaturesHeading',

	LCHVitrineGuideButton: '.LCHVitrineGuideButton',

	LCHVitrineDeeperHeading: '.LCHVitrineDeeperHeading',
	LCHVitrineGlossary: '.LCHVitrineGlossary',

	LCHVitrineVideoHeading: '.LCHVitrineVideoHeading',
	LCHVitrineVideo1Heading: '.OLSKCommonVideoList .LCHVitrineVideo1Heading',
	LCHVitrineVideo1: '.OLSKCommonVideoList .OLSKCommonVideoListItem.LCHVitrineVideo1 iframe',
	LCHVitrineVideo2Heading: '.OLSKCommonVideoList .LCHVitrineVideo2Heading',
	LCHVitrineVideo2: '.OLSKCommonVideoList .OLSKCommonVideoListItem.LCHVitrineVideo2 iframe',
	LCHVitrineVideo3Heading: '.OLSKCommonVideoList .LCHVitrineVideo3Heading',
	LCHVitrineVideo3: '.OLSKCommonVideoList .OLSKCommonVideoListItem.LCHVitrineVideo3 iframe',
	LCHVitrineVideo4Heading: '.OLSKCommonVideoList .LCHVitrineVideo4Heading',
	LCHVitrineVideo4: '.OLSKCommonVideoList .OLSKCommonVideoListItem.LCHVitrineVideo4 iframe',

	LCHVitrineTutorialsButton: '.LCHVitrineTutorialsButton',

	LCHVitrineSupportHeading: '.LCHVitrineSupportHeading',
	LCHVitrineSupportBlurb: '.LCHVitrineSupportBlurb',

	LCHVitrineDemoButtonCommit: '.LCHVitrineDemoButtonCommit',
	LCHVitrineDemoButtonPreview: '.LCHVitrineDemoButtonPreview',
	LCHVitrineDemoButtonPipe: '.LCHVitrineDemoButtonPipe',

	LCHVitrineBrueghel: '.LCHVitrineBrueghel',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LCHVitrine_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows LCHVitrine', function() {
		browser.assert.elements(LCHVitrine, 1)
	});

	it('shows OLSKCrown', function() {
		browser.assert.elements('.OLSKCrown', 1);
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

	it('shows OLSKAppFeatureOpenSource', function () {
		browser.assert.elements('.OLSKAppFeatureListItemOpenSource', 1);
	});

	it('shows LCHVitrineGuideButton', function () {
		browser.assert.elements(LCHVitrineGuideButton, 1);
	});

	it('shows LCHVitrineDeeperHeading', function () {
		browser.assert.elements(LCHVitrineDeeperHeading, 1);
	});

	it('shows LCHVitrineGlossary', function () {
		browser.assert.elements(LCHVitrineGlossary, 1);
	});

	it('shows ROCOGlossary', function () {
		browser.assert.elements('.ROCOGlossary', 1);
	});

	it('shows LCHVitrineVideoHeading', function () {
		browser.assert.elements(LCHVitrineVideoHeading, 1);
	});

	it('shows LCHVitrineVideo1Heading', function () {
		browser.assert.elements(LCHVitrineVideo1Heading, 1);
	});

	it('shows LCHVitrineVideo1', function () {
		browser.assert.elements(LCHVitrineVideo1, 1);
	});

	it('shows LCHVitrineVideo2Heading', function () {
		browser.assert.elements(LCHVitrineVideo2Heading, 1);
	});

	it('shows LCHVitrineVideo2', function () {
		browser.assert.elements(LCHVitrineVideo2, 1);
	});

	it('shows LCHVitrineVideo3Heading', function () {
		browser.assert.elements(LCHVitrineVideo3Heading, 1);
	});

	it('shows LCHVitrineVideo3', function () {
		browser.assert.elements(LCHVitrineVideo3, 1);
	});

	it('shows LCHVitrineVideo4Heading', function () {
		browser.assert.elements(LCHVitrineVideo4Heading, 1);
	});

	it('shows LCHVitrineVideo4', function () {
		browser.assert.elements(LCHVitrineVideo4, 1);
	});

	it('shows LCHVitrineTutorialsButton', function () {
		browser.assert.elements(LCHVitrineTutorialsButton, 1);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKEdit', function () {
		browser.assert.elements('.OLSKEdit', 1);
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

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
