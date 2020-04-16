const { throws, deepEqual } = require('assert');

const mainModule = require('./rollup-config-custom.js');

describe('LCHVitrineRollupConfigCustom', function test_LCHVitrineRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHVitrineRollupConfigCustom(null);
		}, /LCHErrorInputNotValid/);
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
