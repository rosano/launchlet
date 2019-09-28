import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHCopyToClipboardCallback', function testLCHCopyToClipboardCallback() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHCopyToClipboardCallback(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if empty', function() {
		throws(function() {
			mainModule.LCHCopyToClipboardCallback('');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if only whitespace', function() {
		throws(function() {
			mainModule.LCHCopyToClipboardCallback(' ');
		}, /LCHErrorInputInvalid/);
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

describe('LCHCopyToClipboardRecipe', function testLCHCopyToClipboardRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHCopyToClipboardRecipe(), {
			LCHRecipeSignature: 'LCHCopyToClipboard',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: mainModule.LCHCopyToClipboardCallback,
		});
	});

});
