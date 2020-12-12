const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHVitrine: '.LCHVitrine',

	LCHVitrineCrown: '.LCHVitrineCrown',
	LCHVitrineCrownIcon: '.LCHVitrineCrownIcon',
	LCHVitrineCrownName: '.LCHVitrineCrownName',
	LCHVitrineCrownBlurb: '.LCHVitrineCrownBlurb',

	LCHVitrineContent: '.LCHVitrineContent',
	LCHVitrineContentAppButton: '.LCHVitrineContentAppButton',

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

	it('shows LCHVitrineCrownBlurb', function () {
		browser.assert.elements(LCHVitrineCrownBlurb, 1);
	});
	
	it('shows OLSKCommonWhatIsIt', function() {
		browser.assert.elements('.OLSKCommonWhatIsIt', 1);
	});

	it('shows LCHVitrineContent', function() {
		browser.assert.elements(LCHVitrineContent, 1)
	});

	it('shows LCHVitrineContentAppButton', function () {
		browser.assert.elements(LCHVitrineContentAppButton, 1);
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
