const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHCopyToClipboardCallback', function test_LCHCopyToClipboardCallback() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHCopyToClipboardCallback(null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if empty', function() {
		throws(function() {
			mainModule.LCHCopyToClipboardCallback('');
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if only whitespace', function() {
		throws(function() {
			mainModule.LCHCopyToClipboardCallback(' ');
		}, /LCHErrorInputNotValid/);
	});

	it('returns LCHComponentDescriptor', function() {
		deepEqual(mainModule.LCHCopyToClipboardCallback('alfa'), {
			LCHComponentDescriptorName: 'LCHCopyToClipboard',
			LCHComponentDescriptorCompletionHandlerSignature: 'LCHCopyToClipboardCompletionHandler',
			LCHComponentDescriptorProps: {
				inputData: 'alfa',
			},
			LCHComponentDescriptorOLSKLocalized: true,
		});
	});

});

describe('LCHCopyToClipboardRecipe', function test_LCHCopyToClipboardRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHCopyToClipboardRecipe(), {
			LCHRecipeSignature: 'LCHCopyToClipboard',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: mainModule.LCHCopyToClipboardCallback,
		});
	});

});
