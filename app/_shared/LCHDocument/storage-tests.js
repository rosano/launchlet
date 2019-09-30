import { throws, deepEqual } from 'assert';

import * as mainModule from './storage.js';

describe('LCHDocumentStoragePath', function testLCHDocumentStoragePath() {

	it('returns string', function() {
		deepEqual(mainModule.LCHDocumentStoragePath('alfa'), 'lch_documents/alfa');
	});

	it('returns string if blank', function() {
		deepEqual(mainModule.LCHDocumentStoragePath(''), 'lch_documents/');
	});

	it('returns string if undefined', function() {
		deepEqual(mainModule.LCHDocumentStoragePath(), 'lch_documents/');
	});

});
