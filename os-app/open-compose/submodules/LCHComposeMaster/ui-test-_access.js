const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeMaster: '.LCHComposeMaster',
	
	LCHComposeMasterToolbar: '.LCHComposeMasterToolbar',
	
	LCHComposeMasterFilterField: '.LCHComposeMasterFilterField',
	LCHComposeMasterCreateButton: '.LCHComposeMasterCreateButton',
	LCHComposeMasterCreateButtonImage: '.LCHComposeMasterCreateButtonImage',

	LCHComposeMasterBody: '.LCHComposeMasterBody',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeMaster_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHComposeMaster', function () {
		browser.assert.elements(LCHComposeMaster, 1);
	});

	it('shows LCHComposeMasterToolbar', function () {
		browser.assert.elements(LCHComposeMasterToolbar, 1);
	});

	it('shows OLSKInputWrapper', function () {
		browser.assert.elements('.OLSKInputWrapper', 1);
	});

	it('shows LCHComposeMasterFilterField', function () {
		browser.assert.elements(LCHComposeMasterFilterField, 1);
	});

	it('shows LCHComposeMasterCreateButton', function () {
		browser.assert.elements(LCHComposeMasterCreateButton, 1);
	});

	it('shows LCHComposeMasterCreateButtonImage', function () {
		browser.assert.elements(LCHComposeMasterCreateButtonImage, 1);
	});

	it('shows LCHComposeMasterBody', function () {
		browser.assert.elements(LCHComposeMasterBody, 1);
	});

	it('shows OLSKResults', function () {
		browser.assert.elements('.OLSKResults', 1);
	});

	it('hides LCHComposeMasterListItem', function () {
		browser.assert.elements('.LCHComposeMasterListItem', 0);
	});

	context('LCHComposeMasterListItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeMasterListItems: JSON.stringify([{
					LCHDocumentName: 'alfa',
				}]),
			});
		});

		it('shows LCHComposeMasterListItem', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});
		
	});

});
