const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeInput_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeInputItem: JSON.stringify({
				alfa: 'bravo',
			}),
			LCHComposeInputKey: 'alfa',
		});
	});

	it('binds LCHComposeInputKey', function () {
		// browser.assert.input('.CodeMirror', 'bravo'); // #skip-codemirror
		browser.assert.input(LCHComposeInputFieldDebug, 'bravo');
	});

	context('input', function () {

		before(function () {
			browser.assert.text('#TestLCHComposeInputDispatchUpdate', '0');
		});

		before(function () {
			// browser.fill('.CodeMirror', 'charlie'); // #skip-codemirror
			browser.fill(LCHComposeInputFieldDebug, 'charlie');
		});

		it('sends LCHComposeInputDispatchUpdate', function () {
			browser.assert.text('#TestLCHComposeInputDispatchUpdate', '1');
		});

	});

	context.skip('LCHComposeInputFocus', function () {

		before(function () {
			browser.assert.hasNoClass('.CodeMirror', 'CodeMirror-focused');
		});

		before(function () {
			browser.pressButton('#TestLCHComposeInputFocus');
		});

		it('classes CodeMirror-focused', function () {
			browser.assert.hasClass('.CodeMirror', 'CodeMirror-focused');
		});
		
	});

	context('prop', function () {

		before(function () {
			browser.assert.input('#TestLCHComposeInputPropData', 'undefined');
		});

		before(function () {
			browser.fill('#TestLCHComposeInputPropData', JSON.stringify({
				alfa: 'delta',
			}));
			browser.pressButton('#TestLCHComposeInputPropDataSend');
		});

		it('binds LCHComposeInputKey', function () {
			// browser.assert.input('.CodeMirror', 'delta'); // #skip-codemirror
			browser.assert.input(LCHComposeInputFieldDebug, 'delta');
		});
	
	});

});
