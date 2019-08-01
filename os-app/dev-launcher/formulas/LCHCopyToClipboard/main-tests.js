import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHCopyToClipboard', function testLCHCopyToClipboard() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHCopyToClipboard(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if empty', function() {
		throws(function() {
			mainModule.LCHCopyToClipboard('');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if only whitespace', function() {
		throws(function() {
			mainModule.LCHCopyToClipboard(' ');
		}, /LCHErrorInputInvalid/);
	});

	it('returns LCHComponentDescriptor', async function() {
		deepEqual(mainModule.LCHCopyToClipboard('alfa'), {
			LCHComponentDescriptorName: 'LCHCopyToClipboard',
			LCHComponentDescriptorCompletionHandler: 'completionHandler',
			LCHComponentDescriptorProps: {
				inputData: 'alfa',
			},
		});
	});

});