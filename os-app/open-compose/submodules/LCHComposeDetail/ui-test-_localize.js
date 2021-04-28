const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('LCHComposeDetail_Localize-' + OLSKRoutingLanguage, function () {

		context('LCHComposeDetailItem', function() {
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					LCHComposeDetailItem: JSON.stringify({}),
				});
			});

			it('localizes LCHComposeDetailToolbarBackButton', function () {
				browser.assert.attribute(LCHComposeDetailToolbarBackButton, 'title', uLocalized('LCHComposeDetailToolbarBackButtonText'));
			});

			it('localizes LCHComposeDetailToolbarCloneButton', function () {
				browser.assert.attribute(LCHComposeDetailToolbarCloneButton, 'title', uLocalized('LCHComposeDetailToolbarCloneButtonText'));
			});

			it('localizes LCHComposeDetailToolbarDiscardButton', function () {
				browser.assert.attribute(LCHComposeDetailToolbarDiscardButton, 'title', uLocalized('LCHComposeDetailToolbarDiscardButtonText'));
			});

			it('localizes LCHComposeDetailFormNameField', function () {
				browser.assert.attribute(LCHComposeDetailFormNameField, 'placeholder', uLocalized('LCHComposeDetailFormNameFieldText'));
			});

			it('localizes LCHComposeDetailFormSignatureField', function () {
				browser.assert.attribute(LCHComposeDetailFormSignatureField, 'placeholder', uLocalized('LCHComposeDetailFormSignatureFieldText'));
			});

			it('localizes LCHComposeDetailFormCallbackArgsField', function () {
				browser.assert.attribute(LCHComposeDetailFormCallbackArgsField, 'placeholder', uLocalized('LCHComposeDetailFormCallbackArgsFieldText'));
			});

			it('localizes LCHComposeDetailFormCallbackBodyField', function () {
				// browser.assert.text(`.LCHComposeDetailFormCallbackBody .CodeMirror-placeholder`, uLocalized('LCHComposeDetailFormCallbackBodyFieldText')); // #skip-codemirror
			});

			it('localizes LCHComposeDetailFormOutputTypeField', function () {
				browser.assert.attribute(LCHComposeDetailFormOutputTypeField, 'placeholder', uLocalized('LCHComposeDetailFormOutputTypeFieldText'));
			});

			it('localizes LCHComposeDetailFormStyleField', function () {
				// browser.assert.text(`.LCHComposeDetailFormStyle .CodeMirror-placeholder`, uLocalized('LCHComposeDetailFormStyleFieldText')); // #skip-codemirror
			});

			it('localizes LCHComposeDetailFormURLFilterField', function () {
				browser.assert.attribute(LCHComposeDetailFormURLFilterField, 'placeholder', uLocalized('LCHComposeDetailFormURLFilterFieldText').replace(/\\\\/g, '\\'));
			});

			context('LCHDocumentCallbackArgs', function() {

				before(function() {
					browser.fill(LCHComposeDetailFormCallbackArgsField, 'alfa');
				});

				it('localizes LCHComposeDetailFormInputTypesField', function () {
					browser.assert.attribute(LCHComposeDetailFormInputTypesField, 'placeholder', uLocalized('LCHComposeDetailFormInputTypesFieldText'));
				});
				
			});

			context.skip('LCHDocumentOutputType:Bool', function() {

				before(function() {
					browser.fill(LCHComposeDetailFormOutputTypeField, 'Bool');
				});

				it('localizes LCHComposeDetailFormCanonicalExampleBodyField', function () {
					browser.assert.text('.LCHComposeDetailFormCanonicalExampleBody .CodeMirror-placeholder', uLocalized('LCHComposeDetailFormCanonicalExampleBodyFieldText')); // #skip-codemirror
				});
				
			});

			context('LCHDocumentURLFilter', function() {

				before(function() {
					browser.fill(LCHComposeDetailFormURLFilterField, 'alfa');
				});

				it('localizes LCHComposeDetailFormIsAutomaticField', function () {
					browser.assert.text(LCHComposeDetailFormIsAutomaticFieldLabel, uLocalized('LCHComposeDetailFormIsAutomaticFieldLabelText'));
				});
				
			});

			context('discard', function () {
			
				it('localizes LCHComposeDetailDiscardConfirm', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(LCHComposeDetailToolbarDiscardButton);
					}, uLocalized('LCHComposeDetailDiscardConfirmText'));
				});
		
			});

		});

		context('LCHDocumentIsFlagged', function() {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					LCHComposeDetailItem: JSON.stringify({
						LCHDocumentIsFlagged: true,
					}),
				});
			});

			it('localizes LCHComposeDetailFlagAlert', function () {
				browser.assert.text(LCHComposeDetailFlagAlert, uLocalized('LCHComposeDetailFlagAlertText'));
			});
			
		});

	});

});
