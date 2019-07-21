const assert = require('assert');

const mainModule = require('./ui-logic.js');

describe('LCHComposeLogicSort', function testLCHComposeLogicSort() {

	it('sorts by LCHMemberModificationDate descending', function() {
		let item1 = {
			LCHMemberModificationDate: new Date(0),
		};
		let item2 = {
			LCHMemberModificationDate: new Date(1),
		};

		assert.deepEqual([item1, item2].sort(mainModule.LCHComposeLogicSort), [item2, item1]);
	});

	it('sorts by LCHMemberCreationDate descending if no LCHMemberModificationDate', function() {
		let item1 = {
			LCHMemberCreationDate: new Date(0),
		};
		let item2 = {
			LCHMemberCreationDate: new Date(1),
		};

		assert.deepEqual([item1, item2].sort(mainModule.LCHComposeLogicSort), [item2, item1]);
	});

});
