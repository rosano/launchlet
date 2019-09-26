import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	LCHLauncherListItem: '.LCHLauncherResultListItem',

	LCHLauncherResultList: '.LCHLauncherResultList',
	LCHLauncherResultListItem: '.LCHLauncherResultListItem',

	LCHLauncherPromptDotModeInput: '.LCHLauncherPromptDotModeInput',
	LCHLauncherPipeItem: '.LCHLauncherPipeItem',

	LCHLauncherSubjectPrompt: '.LCHLauncherSubjectPrompt',
	LCHLauncherSubjectPromptHeading: '.LCHLauncherSubjectPrompt .LCHLauncherPromptHeading',
	LCHLauncherSubjectPromptPlaceholder: '.LCHLauncherSubjectPromptPlaceholder',
	LCHLauncherSubjectPromptItemSelected: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',

	LCHLauncherActionPrompt: '.LCHLauncherActionPrompt',
	LCHLauncherActionPromptHeading: '.LCHLauncherActionPrompt .LCHLauncherPromptHeading',
	LCHLauncherActionPromptItemSelected: '.LCHLauncherActionPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',
	
	LCHLauncherObjectPrompt: '.LCHLauncherObjectPrompt',
	LCHLauncherObjectPromptHeading: '.LCHLauncherObjectPrompt .LCHLauncherPromptHeading',
	LCHLauncherObjectPromptItemSelected: '.LCHLauncherObjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherAccessCommit', function testLCHLauncherAccessCommit () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModeCommit',
		}));
	});

	it('shows LCHLauncherFilterInput', function() {
		browser.assert.elements(LCHLauncherFilterInput, 1)
	});

	it('hides LCHLauncherListItem', function() {
		browser.assert.elements(LCHLauncherListItem, 0)
	});

	it('hides LCHLauncherPromptDotModeInput', function() {
		browser.assert.elements(LCHLauncherPromptDotModeInput, 0)
	});

	it('hides LCHLauncherSubjectPromptPlaceholder', function() {
		browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0)
	});

	context('filter', function () {

		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'a');
		});

		it('shows LCHLauncherListItem', function() {
			browser.assert.elements(LCHLauncherListItem, 5)
		});
	
	});

});

describe('LCHLauncherAccessPreview', function testLCHLauncherAccessPreview () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePreview',
		}));
	});

	it('shows LCHLauncherFilterInput', function() {
		browser.assert.elements(LCHLauncherFilterInput, 1)
	});

	it('shows LCHLauncherListItem', function() {
		browser.assert.elements(LCHLauncherListItem, 13)
	});

	it('hides LCHLauncherPromptDotModeInput', function() {
		browser.assert.elements(LCHLauncherPromptDotModeInput, 0)
	});

	it('hides LCHLauncherSubjectPromptPlaceholder', function() {
		browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0)
	});

	context('filter', function () {

		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'a');
		});

		it('shows LCHLauncherListItem', function() {
			browser.assert.elements(LCHLauncherListItem, 5)
		});
	
	});

});

describe('LCHLauncherAccessPipe', function testLCHLauncherAccessPipe () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			runMode: 'kRunModePipe',
		}));
	});

	it('hides LCHLauncherFilterInput', function() {
		browser.assert.elements(LCHLauncherFilterInput, 0)
	});

	it('hides LCHLauncherPromptDotModeInput', function() {
		browser.assert.elements(LCHLauncherPromptDotModeInput, 0)
	});

	it('shows LCHLauncherSubjectPromptPlaceholder', function() {
		browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1)
	});

	it('hides LCHLauncherListItem', function() {
		browser.assert.elements(LCHLauncherListItem, 0)
	});

	it('hides LCHLauncherResultList', function() {
		browser.assert.elements(LCHLauncherResultList, 0)
	});

	it('hides LCHLauncherResultListItem', function() {
		browser.assert.elements(LCHLauncherResultListItem, 0)
	});

	it('hides LCHLauncherPipeItem', function() {
		browser.assert.elements(LCHLauncherPipeItem, 0)
	});

});
