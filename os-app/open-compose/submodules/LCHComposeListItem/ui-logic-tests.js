const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('LCHComposeListItemTitle', function test_LCHComposeListItemTitle() {

	it('throws if not object', function () {
		throws(function () {
			mod.LCHComposeListItemTitle(null);
		}, /LCHErrorInputNotValid/);
	});
	
	it('returns LCHDocumentName', function() {
		const LCHDocumentName = Math.random().toString();
		deepEqual(mod.LCHComposeListItemTitle({
			LCHDocumentName,
		}), LCHDocumentName);
	});
	
	it('returns LCHDocumentSignature if no LCHDocumentName', function() {
		const LCHDocumentSignature = Math.random().toString();
		deepEqual(mod.LCHComposeListItemTitle({
			LCHDocumentSignature,
		}), LCHDocumentSignature);
	});
	
	it('returns LCHDocumentID if no LCHDocumentSignature', function() {
		const LCHDocumentID = Math.random().toString();
		deepEqual(mod.LCHComposeListItemTitle({
			LCHDocumentID,
		}), LCHDocumentID);
	});

});
