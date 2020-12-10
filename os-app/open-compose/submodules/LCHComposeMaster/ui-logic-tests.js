const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('LCHComposeMasterListItemAccessibilitySummary', function test_LCHComposeMasterListItemAccessibilitySummary() {

	const item = {
		LCHDocumentID: 'alfa',
		LCHDocumentName: 'bravo',
		LCHDocumentSignature: 'charlie',
	};

	it('throws if not object', function () {
		throws(function () {
			mod.LCHComposeMasterListItemAccessibilitySummary(null);
		}, /LCHErrorInputNotValid/);
	});
	
	it('returns LCHDocumentName', function() {
		deepEqual(mod.LCHComposeMasterListItemAccessibilitySummary(item), 'bravo');
	});
	
	it('returns LCHDocumentSignature if no LCHDocumentName', function() {
		deepEqual(mod.LCHComposeMasterListItemAccessibilitySummary(Object.assign(item, {
			LCHDocumentName: undefined,
		})), 'charlie');
	});
	
	it('returns LCHComposeMasterListItemUntitledText if no LCHDocumentSignature', function() {
		deepEqual(mod.LCHComposeMasterListItemAccessibilitySummary(Object.assign(item, {
			LCHDocumentSignature: undefined,
		}), function (inputData) {
			return inputData;
		}), 'LCHComposeMasterListItemUntitledText');
	});
	
	it('includes LCHComposeMasterListItemFlaggedAlertText if LCHDocumentIsFlagged', function() {
		deepEqual(mod.LCHComposeMasterListItemAccessibilitySummary(Object.assign(item, {
			LCHDocumentIsFlagged: true,
		}), function (inputData) {
			return inputData;
		}), 'LCHComposeMasterListItemFlaggedAlertText\nLCHComposeMasterListItemUntitledText');
	});

});

describe('LCHComposeMasterListItemTitle', function test_LCHComposeMasterListItemTitle() {

	const item = {
		LCHDocumentID: 'alfa',
		LCHDocumentName: 'bravo',
		LCHDocumentSignature: 'charlie',
	};

	it('throws if not object', function () {
		throws(function () {
			mod.LCHComposeMasterListItemTitle(null);
		}, /LCHErrorInputNotValid/);
	});
	
	it('returns LCHDocumentName', function() {
		deepEqual(mod.LCHComposeMasterListItemTitle(item), 'bravo');
	});
	
	it('returns LCHDocumentSignature if no LCHDocumentName', function() {
		deepEqual(mod.LCHComposeMasterListItemTitle(Object.assign(item, {
			LCHDocumentName: undefined,
		})), 'charlie');
	});
	
	it('returns LCHDocumentID if no LCHDocumentSignature', function() {
		deepEqual(mod.LCHComposeMasterListItemTitle(Object.assign(item, {
			LCHDocumentSignature: undefined,
		})), 'alfa');
	});

});
