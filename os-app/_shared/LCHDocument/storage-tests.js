const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('LCHDocumentStorageCollectionName', function test_LCHDocumentStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mainModule.LCHDocumentStorageCollectionName(), 'lch_documents');
	});

});

describe('LCHDocumentStorageCollectionType', function test_LCHDocumentStorageCollectionType() {

	it('returns string', function() {
		deepEqual(mainModule.LCHDocumentStorageCollectionType(), 'lch_document');
	});

});

describe('LCHDocumentStorageCollectionPath', function test_LCHDocumentStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mainModule.LCHDocumentStorageCollectionPath(), mainModule.LCHDocumentStorageCollectionName() + '/');
	});

});

describe('LCHDocumentStorageObjectPath', function test_LCHDocumentStorageObjectPath() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHDocumentStorageObjectPath({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = StubDocumentObjectValid();
		deepEqual(mainModule.LCHDocumentStorageObjectPath(item), mainModule.LCHDocumentStorageCollectionPath() + item.LCHDocumentID);
	});

});

describe('LCHDocumentStorageMatch', function test_LCHDocumentStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHDocumentStorageMatch(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHDocumentStorageCollectionPath', function() {
		const item = mainModule.LCHDocumentStorageCollectionPath();
		deepEqual(mainModule.LCHDocumentStorageMatch(mainModule.LCHDocumentStorageObjectPath(StubDocumentObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no LCHDocumentStorageObjectPath', function() {
		deepEqual(mainModule.LCHDocumentStorageMatch(mainModule.LCHDocumentStorageObjectPath(StubDocumentObjectValid()) + '/'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHDocumentStorageMatch(mainModule.LCHDocumentStorageObjectPath(StubDocumentObjectValid())), true);
	});

});
