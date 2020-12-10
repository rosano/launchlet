const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHCopyToClipboardCallback', function test_LCHCopyToClipboardCallback() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHCopyToClipboardCallback(null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if empty', function() {
		throws(function() {
			mod.LCHCopyToClipboardCallback('');
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if only whitespace', function() {
		throws(function() {
			mod.LCHCopyToClipboardCallback(' ');
		}, /LCHErrorInputNotValid/);
	});

	it('returns LCHComponentDescriptor', function() {
		deepEqual(mod.LCHCopyToClipboardCallback('alfa'), {
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
		deepEqual(mod.LCHCopyToClipboardRecipe(), {
			LCHRecipeSignature: 'LCHCopyToClipboard',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: mod.LCHCopyToClipboardCallback,
		});
	});

});
