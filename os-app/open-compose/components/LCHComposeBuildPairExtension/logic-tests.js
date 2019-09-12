import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LCHResponseIsValid', function testLCHResponseIsVald() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHResponseIsValid(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if LCHResponseString not string', function() {
		deepEqual(mainModule.LCHResponseIsValid({
			LCHResponseString: null,
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHResponseIsValid({
			LCHResponseString: '',
		}), true);
	});	

});
