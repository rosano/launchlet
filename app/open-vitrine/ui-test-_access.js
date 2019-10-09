import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	LCHVitrineContent: '.LCHVitrineContent',
	
	LCHVitrineLogo: '.LCHVitrineLogo',

	LCHVitrineDemoButtonCommit: '.LCHVitrineDemoButtonCommit',
	LCHVitrineDemoButtonPreview: '.LCHVitrineDemoButtonPreview',
	LCHVitrineDemoButtonPipe: '.LCHVitrineDemoButtonPipe',

	LCHVitrineBrueghel: '.LCHVitrineBrueghel',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows RCSLanguageSwitcher', function() {
		browser.assert.elements('#RCSLanguageSwitcher', 1)
	});
	
	it('shows LCHVitrineContent', function() {
		browser.assert.elements(LCHVitrineContent, 1)
	});
	
	it('shows LCHVitrineLogo', function() {
		browser.assert.elements(LCHVitrineLogo, 1)
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
