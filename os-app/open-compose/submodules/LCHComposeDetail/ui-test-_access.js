const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeDetail: '.LCHComposeDetail',
	
	LCHComposeDetailToolbar: '.LCHComposeDetailToolbar',
	LCHComposeDetailToolbarBackButton: '.LCHComposeDetailToolbarBackButton',
	LCHComposeDetailToolbarBackButtonImage: '.LCHComposeDetailToolbarBackButtonImage',
	LCHComposeDetailToolbarCloneButton: '.LCHComposeDetailToolbarCloneButton',	
	LCHComposeDetailToolbarCloneButtonImage: '.LCHComposeDetailToolbarCloneButtonImage',
	LCHComposeDetailToolbarDiscardButton: '.LCHComposeDetailToolbarDiscardButton',	
	LCHComposeDetailToolbarDiscardButtonImage: '.LCHComposeDetailToolbarDiscardButtonImage',

	LCHComposeDetailForm: '.LCHComposeDetailForm',

	LCHComposeDetailFlagAlert: '.LCHComposeDetailFlagAlert',
	
	LCHComposeDetailFormNameField: '.LCHComposeDetailFormNameField',
	LCHComposeDetailFormSignatureField: '.LCHComposeDetailFormSignatureField',
	LCHComposeDetailFormInputTypesField: '.LCHComposeDetailFormInputTypesField',
	LCHComposeDetailFormCallbackArgsField: '.LCHComposeDetailFormCallbackArgsField',
	LCHComposeDetailFormCallbackBodyField: '.LCHComposeDetailFormCallbackBody .LCHComposeInput',
	LCHComposeDetailFormOutputTypeField: '.LCHComposeDetailFormOutputTypeField',
	LCHComposeDetailFormCanonicalExampleCallbackBodyField: '.LCHComposeDetailFormCanonicalExampleCallbackBody .LCHComposeInput',

	LCHComposeDetailFormStyleField: '.LCHComposeDetailFormStyle .LCHComposeInput',

	LCHComposeDetailFormURLFilterField: '.LCHComposeDetailFormURLFilterField',
	LCHComposeDetailFormIsAutomaticFieldLabel: '.LCHComposeDetailFormIsAutomaticFieldLabel',
	LCHComposeDetailFormIsAutomaticField: '.LCHComposeDetailFormIsAutomaticField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeDetail_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeDetailItem: null,
		});
	});

	it('shows LCHComposeDetail', function () {
		browser.assert.elements(LCHComposeDetail, 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides LCHComposeDetailToolbar', function () {
		browser.assert.elements(LCHComposeDetailToolbar, 0);
	});

	it('hides LCHComposeDetailForm', function () {
		browser.assert.elements(LCHComposeDetailForm, 0);
	});

	context('LCHComposeDetailItem', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({}),
			});
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows LCHComposeDetailToolbar', function () {
			browser.assert.elements(LCHComposeDetailToolbar, 1);
		});

		it('shows LCHComposeDetailToolbarBackButton', function () {
			browser.assert.elements(LCHComposeDetailToolbarBackButton, 1);
		});

		it('shows LCHComposeDetailToolbarBackButtonImage', function () {
			browser.assert.elements(LCHComposeDetailToolbarBackButtonImage, 1);
		});

		it('shows LCHComposeDetailToolbarCloneButton', function () {
			browser.assert.elements(LCHComposeDetailToolbarCloneButton, 1);
		});

		it('shows LCHComposeDetailToolbarCloneButtonImage', function () {
			browser.assert.elements(LCHComposeDetailToolbarCloneButtonImage, 1);
		});

		it('shows LCHComposeDetailToolbarDiscardButton', function () {
			browser.assert.elements(LCHComposeDetailToolbarDiscardButton, 1);
		});

		it('shows LCHComposeDetailToolbarDiscardButtonImage', function () {
			browser.assert.elements(LCHComposeDetailToolbarDiscardButtonImage, 1);
		});

		it('shows LCHComposeDetailForm', function () {
			browser.assert.elements(LCHComposeDetailForm, 1);
		});

		it('hides LCHComposeDetailFlagAlert', function () {
			browser.assert.elements(LCHComposeDetailFlagAlert, 0);
		});

		it('shows LCHComposeDetailFormNameField', function () {
			browser.assert.elements(LCHComposeDetailFormNameField, 1);
		});

		it('shows LCHComposeDetailFormSignatureField', function () {
			browser.assert.elements(LCHComposeDetailFormSignatureField, 1);
		});

		it('hides LCHComposeDetailFormInputTypesField', function () {
			browser.assert.elements(LCHComposeDetailFormInputTypesField, 0);
		});

		it('shows LCHComposeDetailFormCallbackArgsField', function () {
			browser.assert.elements(LCHComposeDetailFormCallbackArgsField, 1);
		});

		it('shows LCHComposeDetailFormCallbackBodyField', function () {
			browser.assert.elements(LCHComposeDetailFormCallbackBodyField, 1);
		});

		it('shows LCHComposeDetailFormOutputTypeField', function () {
			browser.assert.elements(LCHComposeDetailFormOutputTypeField, 1);
		});

		it('hides LCHComposeDetailFormCanonicalExampleCallbackBodyField', function () {
			browser.assert.elements(LCHComposeDetailFormCanonicalExampleCallbackBodyField, 0);
		});

		it('shows LCHComposeDetailFormStyleField', function () {
			browser.assert.elements(LCHComposeDetailFormStyleField, 1);
		});

		it('shows LCHComposeDetailFormURLFilterField', function () {
			browser.assert.elements(LCHComposeDetailFormURLFilterField, 1);
		});

		it('hides LCHComposeDetailFormIsAutomaticField', function () {
			browser.assert.elements(LCHComposeDetailFormIsAutomaticField, 0);
		});

		it('hides LCHComposeDetailFormIsAutomaticFieldLabel', function () {
			browser.assert.elements(LCHComposeDetailFormIsAutomaticFieldLabel, 0);
		});

		context('LCHDocumentCallbackArgs', function() {

			before(function() {
				browser.fill(LCHComposeDetailFormCallbackArgsField, 'alfa');
			});

			it('shows LCHComposeDetailFormInputTypesField', function () {
				browser.assert.elements(LCHComposeDetailFormInputTypesField, 1);
			});
			
		});

		context('LCHDocumentOutputType:Bool', function() {

			before(function() {
				browser.fill(LCHComposeDetailFormOutputTypeField, 'Bool');
			});

			it('shows LCHComposeDetailFormCanonicalExampleCallbackBodyField', function () {
				browser.assert.elements(LCHComposeDetailFormCanonicalExampleCallbackBodyField, 1);
			});
			
		});

		context('LCHDocumentURLFilter', function() {

			before(function() {
				browser.fill(LCHComposeDetailFormURLFilterField, 'alfa');
			});

			it('shows LCHComposeDetailFormIsAutomaticField', function () {
				browser.assert.elements(LCHComposeDetailFormIsAutomaticField, 1);
			});

			it('shows LCHComposeDetailFormIsAutomaticFieldLabel', function () {
				browser.assert.elements(LCHComposeDetailFormIsAutomaticFieldLabel, 1);
			});
			
		});
		
	});

	context('LCHDocumentIsFlagged', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentIsFlagged: true,
				}),
			});
		});

		it('shows LCHComposeDetailFlagAlert', function () {
			browser.assert.elements(LCHComposeDetailFlagAlert, 1);
		});
		
	});

});
