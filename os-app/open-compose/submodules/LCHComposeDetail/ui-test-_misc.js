const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeDetail_Misc', function () {

	describe('LCHComposeDetail', function test_LCHComposeDetail () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({}),
			});
		});

		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(LCHComposeDetail, 'OLSKViewportDetail');
		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				browser.assert.hasNoClass(LCHComposeDetail, 'OLSKMobileViewInactive');
			});

			before(function () {
				browser.assert.attribute(LCHComposeDetail, 'aria-hidden', null);
			});
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					LCHComposeDetailItem: JSON.stringify({}),
					OLSKMobileViewInactive: true,
				});
			});

			it('classes OLSKMobileViewInactive', function () {
				browser.assert.hasClass(LCHComposeDetail, 'OLSKMobileViewInactive');
			});

			it('sets aria-hidden', function () {
				browser.assert.attribute(LCHComposeDetail, 'aria-hidden', 'true');
			});
		
		});

		context('LCHDocumentIsFlagged', function() {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					LCHComposeDetailItem: JSON.stringify({
						LCHDocumentIsFlagged: true,
						LCHDocumentSyntaxErrorMessage: 'alfa',
					}),
				});
			});

			context('LCHComposeDetailFlagAlert', function () {
				
				it('binds LCHDocumentSyntaxErrorMessage', function () {
					browser.assert.text(LCHComposeDetailFlagAlert, 'alfa');
				});
			
			});
			
		});

	});

	describe('LCHComposeDetailToolbar', function test_LCHComposeDetailToolbar () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({}),
			});
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(LCHComposeDetailToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(LCHComposeDetailToolbar, 'OLSKToolbarJustify');
		});
		
		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(LCHComposeDetailToolbar, 'OLSKMobileViewHeader');
		});
	
	});

	describe('LCHComposeDetailToolbarBackButton', function test_LCHComposeDetailToolbarBackButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarBackButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarBackButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(LCHComposeDetailToolbarBackButton);
			});

			it('sends LCHComposeDetailDispatchBack', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchBack', '1');
			});
		
		});
	
	});

	describe('LCHComposeDetailToolbarBackButtonImage', function test_LCHComposeDetailToolbarBackButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ LCHComposeDetailToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});
	
	});

	describe('LCHComposeDetailToolbarCloneButton', function test_LCHComposeDetailToolbarCloneButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarCloneButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarCloneButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarCloneButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchClone', '0');
			});
			
			before(function () {
				return browser.pressButton(LCHComposeDetailToolbarCloneButton);
			});

			it('sends LCHComposeDetailDispatchClone', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchClone', '1');
			});

		});
	
	});

	describe('LCHComposeDetailToolbarCloneButtonImage', function test_LCHComposeDetailToolbarCloneButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ LCHComposeDetailToolbarCloneButtonImage } #_OLSKSharedClone`, 1);
		});
	
	});

	describe('LCHComposeDetailToolbarDiscardButton', function test_LCHComposeDetailToolbarDiscardButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarDiscardButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(LCHComposeDetailToolbarDiscardButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchDiscard', '0');
			});
			
			before(function () {
				return browser.pressButton(LCHComposeDetailToolbarDiscardButton);
			});

			it('sends LCHComposeDetailDispatchDiscard', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchDiscard', '1');
			});

		});
	
	});

	describe('LCHComposeDetailToolbarDiscardButtonImage', function test_LCHComposeDetailToolbarDiscardButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ LCHComposeDetailToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});
	
	});
	
	describe('LCHComposeDetailFormNameField', function test_LCHComposeDetailFormNameField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentName: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeDetailFormNameField, 'type', 'text');
		});

		it('binds LCHDocumentName', function () {
			browser.assert.input(LCHComposeDetailFormNameField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentName: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(LCHComposeDetailFormNameField, 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentName: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormSignatureField', function test_LCHComposeDetailFormSignatureField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentSignature: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeDetailFormSignatureField, 'type', 'text');
		});

		it('binds LCHDocumentSignature', function () {
			browser.assert.input(LCHComposeDetailFormSignatureField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentSignature: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(LCHComposeDetailFormSignatureField, 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentSignature: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormInputTypesField', function test_LCHComposeDetailFormInputTypesField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentCallbackArgs: 'alfa',
					LCHDocumentInputTypes: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeDetailFormInputTypesField, 'type', 'text');
		});

		it('binds LCHDocumentInputTypes', function () {
			browser.assert.input(LCHComposeDetailFormInputTypesField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentCallbackArgs: 'alfa',
					LCHDocumentInputTypes: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(LCHComposeDetailFormInputTypesField, 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentCallbackArgs: 'alfa',
					LCHDocumentInputTypes: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormCallbackArgsField', function test_LCHComposeDetailFormCallbackArgsField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentCallbackArgs: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeDetailFormCallbackArgsField, 'type', 'text');
		});

		it('binds LCHDocumentCallbackArgs', function () {
			browser.assert.input(LCHComposeDetailFormCallbackArgsField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentCallbackArgs: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(LCHComposeDetailFormCallbackArgsField, 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentCallbackArgs: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormCallbackBodyField', function test_LCHComposeDetailFormCallbackBodyField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentCallbackBody: 'alfa',
				}),
			});
		});

		it('binds LCHDocumentCallbackBody', function () {
			// browser.assert.input('.CodeMirror', 'alfa'); // #skip-codemirror
			browser.assert.input('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug', 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentCallbackBody: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				// browser.fill('CodeMirror', 'bravo'); // #skip-codemirror
				browser.fill('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug', 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentCallbackBody: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormOutputTypeField', function test_LCHComposeDetailFormOutputTypeField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentOutputType: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeDetailFormOutputTypeField, 'type', 'text');
		});

		it('binds LCHDocumentOutputType', function () {
			browser.assert.input(LCHComposeDetailFormOutputTypeField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentOutputType: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(LCHComposeDetailFormOutputTypeField, 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentOutputType: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormCanonicalExampleCallbackBodyField', function test_LCHComposeDetailFormCanonicalExampleCallbackBodyField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentOutputType: 'Bool',
					LCHDocumentCanonicalExampleCallbackBody: 'alfa',
				}),
			});
		});

		it('binds LCHDocumentCanonicalExampleCallbackBody', function () {
			// browser.assert.input('.CodeMirror', 'alfa'); // #skip-codemirror
			browser.assert.input('.LCHComposeDetailFormCanonicalExampleCallbackBody .LCHComposeInputFieldDebug', 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentOutputType: 'Bool',
					LCHDocumentCanonicalExampleCallbackBody: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				// browser.fill('CodeMirror', 'bravo'); // #skip-codemirror
				browser.fill('.LCHComposeDetailFormCanonicalExampleCallbackBody .LCHComposeInputFieldDebug', 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentOutputType: 'Bool',
					LCHDocumentCanonicalExampleCallbackBody: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormStyleField', function test_LCHComposeDetailFormStyleField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentStyle: 'alfa',
				}),
			});
		});

		it('binds LCHDocumentStyle', function () {
			// browser.assert.input('.CodeMirror', 'alfa'); // #skip-codemirror
			browser.assert.input('.LCHComposeDetailFormStyle .LCHComposeInputFieldDebug', 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentStyle: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				// browser.fill('CodeMirror', 'bravo'); // #skip-codemirror
				browser.fill('.LCHComposeDetailFormStyle .LCHComposeInputFieldDebug', 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentStyle: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormURLFilterField', function test_LCHComposeDetailFormURLFilterField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentURLFilter: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeDetailFormURLFilterField , 'type', 'text');
		});

		it('binds LCHDocumentURLFilter', function () {
			browser.assert.input(LCHComposeDetailFormURLFilterField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentURLFilter: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(LCHComposeDetailFormURLFilterField, 'bravo');
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentURLFilter: 'bravo',
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('LCHComposeDetailFormIsAutomaticField', function test_LCHComposeDetailFormIsAutomaticField() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeDetailItem: JSON.stringify({
					LCHDocumentURLFilter: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(LCHComposeDetailFormIsAutomaticField, 'type', 'checkbox');
		});

		context('false', function () {
			
			it('binds LCHDocumentIsAutomatic', function () {
				browser.assert.OLSKIsChecked(LCHComposeDetailFormIsAutomaticField, false);
			});
			
		});

		context('true', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					LCHComposeDetailItem: JSON.stringify({
						LCHDocumentURLFilter: 'alfa',
						LCHDocumentIsAutomatic: true,
					}),
				});
			});

			it('binds LCHDocumentIsAutomatic', function () {
				browser.assert.OLSKIsChecked(LCHComposeDetailFormIsAutomaticField, true);
			});
		
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentURLFilter: 'alfa',
					LCHDocumentIsAutomatic: true,
				}));
			});

			before(function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '0');
			});

			before(function () {
				return browser.uncheck(LCHComposeDetailFormIsAutomaticField);
			});

			it('updates LCHComposeDetailItem', function () {
				browser.assert.text('#TestLCHComposeDetailItem', JSON.stringify({
					LCHDocumentURLFilter: 'alfa',
					LCHDocumentIsAutomatic: false,
				}));
			});

			it('sends LCHComposeDetailDispatchUpdate', function () {
				browser.assert.text('#TestLCHComposeDetailDispatchUpdate', '1');
			});
		
		});

	});

});
