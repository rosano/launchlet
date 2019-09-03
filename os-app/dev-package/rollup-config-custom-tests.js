import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './rollup-config-custom.js';

describe('OLSKRollupConfigCustomFor', function testOLSKRollupConfigCustomFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.OLSKRollupConfigCustomFor(null);
		}, /LCHErrorInputInvalid/);
	})

	it('sets output.name', function() {
		deepEqual(mainModule.OLSKRollupConfigCustomFor({
			output: {},
			plugins: [],
		}).output.name, 'Launchlet');
	});

	it('sets output.file', function() {
		deepEqual(mainModule.OLSKRollupConfigCustomFor({
			output: {},
			plugins: [],
		}).output.file, require('path').join(__dirname, '__compiled/launchlet.js'));
	});

});
