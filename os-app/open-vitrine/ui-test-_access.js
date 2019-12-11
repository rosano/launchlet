import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHVitrine: '.LCHVitrine',
	
	LCHVitrineIdentity: '.LCHVitrineIdentity',
	LCHVitrineIdentityLogo: '.LCHVitrineIdentityLogo',
	LCHVitrineIdentityName: '.LCHVitrineIdentityName',

	LCHVitrineContent: '.LCHVitrineContent',

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
	
	it('shows LCHVitrineIdentity', function() {
		browser.assert.elements(LCHVitrineIdentity, 1)
	});
	
	it('shows LCHVitrineIdentityLogo', function() {
		browser.assert.elements(LCHVitrineIdentityLogo, 1)
	});
	
	it('shows LCHVitrineIdentityName', function() {
		browser.assert.elements(LCHVitrineIdentityName, 1)
	});
	
	it('shows LCHVitrineContent', function() {
		browser.assert.elements(LCHVitrineContent, 1)
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
