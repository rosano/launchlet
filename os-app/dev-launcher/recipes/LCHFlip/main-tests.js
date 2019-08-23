import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHFlip', function testLCHFlip() {

	it('throws error if param1 not function', function() {
		throws(function() {
			mainModule.LCHFlip(null, []);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not array', function() {
		throws(function() {
			mainModule.LCHFlip(function() {}, null);
		}, /LCHErrorInputInvalid/);
	});

	it('calls api with result', function() {
		deepEqual(mainModule.LCHFlip(function(param1, param2) {
			return [param1, param2];
		}, ['alfa', 'bravo']), ['bravo', 'alfa']);
	});

	it('passes param3 to this', function() {
		deepEqual(mainModule.LCHFlip(function() {
			return this.alfa;
		}, [], {
			alfa: 'bravo',
		}), 'bravo');
	});

});
