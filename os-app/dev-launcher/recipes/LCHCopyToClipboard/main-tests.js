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

	it('returns LCHComponentDescriptor', async function() {
		deepEqual(mainModule.LCHCopyToClipboardCallback('alfa'), {
			LCHComponentDescriptorName: 'LCHCopyToClipboard',
			LCHComponentDescriptorCompletionHandler: 'completionHandler',
			LCHComponentDescriptorProps: {
				inputData: 'alfa',
			},
		});
	});

});

describe('LCHCopyToClipboardRecipe', function testLCHCopyToClipboardRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHCopyToClipboardRecipe(), {
			LCHRecipeTitle: 'Copy To Clipboard',
			LCHRecipeSignature: 'LCHCopyToClipboard',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: mainModule.LCHCopyToClipboardCallback,
		});
	});

});
