import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LBXResponseIsValid', function testLBXResponseIsVald() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXResponseIsValid(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if LBXResponseHash not string', function() {
		deepEqual(mainModule.LBXResponseIsValid({
			LBXResponseHash: null,
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXResponseIsValid({
			LBXResponseHash: '',
		}), true);
	});

	context('LBXResponseError', function () {

		it('returns false if not string', function() {
			deepEqual(mainModule.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: null,
			}), false);
		});

		it('returns false if not filled', function() {
			deepEqual(mainModule.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: ' ',
			}), false);
		});

		it('returns true', function() {
			deepEqual(mainModule.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: 'alfa',
			}), true);
		});
	
	});

});
