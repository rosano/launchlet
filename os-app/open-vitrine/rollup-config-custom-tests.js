const { throws, deepEqual } = require('assert');

const mod = require('./rollup-config-custom.js');

describe('LCHVitrineRollupConfigCustom', function test_LCHVitrineRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHVitrineRollupConfigCustom(null);
		}, /LCHErrorInputNotValid/);
	})

	it('sets output.name', function() {
		deepEqual(mod.LCHVitrineRollupConfigCustom({
			output: {},
			plugins: [],
		}).output.name, 'LCHVitrineBehaviour');
	});

});
