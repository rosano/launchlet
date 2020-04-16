const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js');

describe('LCHDocumentStoragePath', function test_LCHDocumentStoragePath() {

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
