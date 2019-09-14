import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './rollup-config-custom.js';

describe('LCHVitrineRollupConfigCustom', function testLCHVitrineRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHVitrineRollupConfigCustom(null);
		}, /LCHErrorInputInvalid/);
	})

	it('sets output.name', function() {
		deepEqual(mainModule.LCHVitrineRollupConfigCustom({
			output: {},
			plugins: [],
		}).output.name, 'LCHVitrineBehaviour');
	});

	it('removes livereload', function() {
		deepEqual(mainModule.LCHVitrineRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
