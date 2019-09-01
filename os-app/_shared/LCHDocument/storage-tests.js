import { throws, deepEqual } from 'assert';

import * as mainModule from './storage.js';

const kTesting = {
	StubChangeObjectWindow () {
		return {
	   path: '/public/design/color.txt',
	   relativePath: 'color.txt',
	   origin: 'window',
	   oldValue: 'white',
	   newValue: 'blue',
	   oldContentType: 'text/plain',
	   newContentType: 'text/plain'
	 };
	},
	StubChangeObjectConflict () {
		return {
	   path: '/public/design/color.txt',
	   relativePath: 'color.txt',
	   origin: 'conflict',
	   oldValue: 'blue',
	   newValue: 'red',
	   oldContentType: 'text/plain',
	   newContentType: 'text/plain',
	   // Most recent known common ancestor body of local and remote
	   lastCommonValue: 'white',
	   // Most recent known common ancestor contentType of local and remote
	   lastCommonContentType: 'text/plain'
	 };
	},
	StubChangeObjectLocalInit () {
		return {
			origin: 'local',
			path: '/remotestorage_quantity_test/xyz_documents/01DKQBS2PY79VJRZ80T54EA3YV',
			oldValue: undefined,
			oldContentType: undefined,
			newValue: {XYZDocumentName: '', XYZDocumentModificationDate: '2019-09-01T21:30:29.470Z', XYZDocumentID: '01DKQBS2PY79VJRZ80T54EA3YV', XYZDocumentCreationDate: '2019-09-01T21:30:29.470Z', '@context': 'http://remotestorage.io/spec/modules/remotestorage_quantity_test/xyz_document'},
			newContentType: 'application/json; charset=UTF-8',
			relativePath: 'xyz_documents/01DKQBS2PY79VJRZ80T54EA3YV',
	 };
	},
	StubChangeObjectRemoteCreate () {
		return {
			origin: 'remote',
			path: '/remotestorage_quantity_test/xyz_documents/01DKQBS2PY79VJRZ80T54EA3YV',
			oldValue: undefined,
			oldContentType: undefined,
			newValue: {XYZDocumentName: '', XYZDocumentModificationDate: '2019-09-01T21:30:29.470Z', XYZDocumentID: '01DKQBS2PY79VJRZ80T54EA3YV', XYZDocumentCreationDate: '2019-09-01T21:30:29.470Z', '@context': 'http://remotestorage.io/spec/modules/remotestorage_quantity_test/xyz_document'},
			newContentType: 'application/json; charset=UTF-8',
			relativePath: 'xyz_documents/01DKQBS2PY79VJRZ80T54EA3YV',
	 };
	},
	StubChangeObjectRemoteUpdate () {
		return {
			origin: 'remote',
			path: '/remotestorage_quantity_test/xyz_documents/01DKQBS2PY79VJRZ80T54EA3YV',
			oldValue: {XYZDocumentName: '', XYZDocumentModificationDate: '2019-09-01T21:30:29.470Z', XYZDocumentID: '01DKQBS2PY79VJRZ80T54EA3YV', XYZDocumentCreationDate: '2019-09-01T21:30:29.470Z', '@context': 'http://remotestorage.io/spec/modules/remotestorage_quantity_test/xyz_document'},
			oldContentType: 'application/json; charset=UTF-8',
			newValue: {XYZDocumentName: 'test', XYZDocumentModificationDate: '2019-09-01T21:32:29.470Z', XYZDocumentID: '01DKQBS2PY79VJRZ80T54EA3YV', XYZDocumentCreationDate: '2019-09-01T21:30:29.470Z', '@context': 'http://remotestorage.io/spec/modules/remotestorage_quantity_test/xyz_document'},
			newContentType: 'application/json; charset=UTF-8',
			relativePath: 'xyz_documents/01DKQBS2PY79VJRZ80T54EA3YV',
	 };
	},
	StubChangeObjectRemoteDelete () {
		return {
			origin: 'remote',
			path: '/remotestorage_quantity_test/xyz_documents/01DKQBS2PY79VJRZ80T54EA3YV',
			oldValue: {XYZDocumentName: 'test', XYZDocumentModificationDate: '2019-09-01T21:32:59.908Z', XYZDocumentID: '01DKQBS2PY79VJRZ80T54EA3YV', XYZDocumentCreationDate: '2019-09-01T21:30:29.470Z', '@context': 'http://remotestorage.io/spec/modules/remotestorage_quantity_test/xyz_document'},
			oldContentType: 'application/json; charset=UTF-8',
			newValue: undefined,
			newContentType: undefined,
			relativePath: 'xyz_documents/01DKQBS2PY79VJRZ80T54EA3YV',
	 };
	},
};

describe('XYZDocumentChangeDelegateMethods', function testXYZDocumentChangeDelegateMethods() {

	it('returns array', function() {
		deepEqual(mainModule.XYZDocumentChangeDelegateMethods(), [
			'OLSKChangeDelegateCreate',
			'OLSKChangeDelegateUpdate',
			'OLSKChangeDelegateDelete',
			]);
	})

});

describe('XYZDocumentChangeDelegateProperty', function testXYZDocumentChangeDelegateProperty() {

	it('returns undefined', function() {
		deepEqual(typeof mainModule.XYZDocumentChangeDelegateProperty(), 'undefined');
	});

	it('returns undefined if window', function() {
		deepEqual(typeof mainModule.XYZDocumentChangeDelegateProperty(kTesting.StubChangeObjectWindow()), 'undefined');
	});

	it('returns undefined if conflict', function() {
		deepEqual(typeof mainModule.XYZDocumentChangeDelegateProperty(kTesting.StubChangeObjectConflict()), 'undefined');
	});

	it('returns undefined if local init', function() {
		deepEqual(typeof mainModule.XYZDocumentChangeDelegateProperty(kTesting.StubChangeObjectLocalInit()), 'undefined');
	});

	it('returns string if remote create', function() {
		deepEqual(mainModule.XYZDocumentChangeDelegateProperty(kTesting.StubChangeObjectRemoteCreate()), 'OLSKChangeDelegateCreate');
	});

	it('returns string if remote update', function() {
		deepEqual(mainModule.XYZDocumentChangeDelegateProperty(kTesting.StubChangeObjectRemoteUpdate()), 'OLSKChangeDelegateUpdate');
	});

	it('returns string if remote delete', function() {
		deepEqual(mainModule.XYZDocumentChangeDelegateProperty(kTesting.StubChangeObjectRemoteDelete()), 'OLSKChangeDelegateDelete');
	});

});

describe('XYZDocumentChangeDelegateInput', function testXYZDocumentChangeDelegateInput() {

	it('throws if not valid', function() {
		throws(function () {
			mainModule.XYZDocumentChangeDelegateInput('alfa');
		}, /LCHErrorInputInvalid/);
	});

	it('returns newValue if OLSKChangeDelegateCreate', function() {
		deepEqual(mainModule.XYZDocumentChangeDelegateInput('OLSKChangeDelegateCreate'), 'newValue');
	});

	it('returns newValue if OLSKChangeDelegateUpdate', function() {
		deepEqual(mainModule.XYZDocumentChangeDelegateInput('OLSKChangeDelegateUpdate'), 'newValue');
	});

	it('returns oldValue if OLSKChangeDelegateDelete', function() {
		deepEqual(mainModule.XYZDocumentChangeDelegateInput('OLSKChangeDelegateDelete'), 'oldValue');
	});

});

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
