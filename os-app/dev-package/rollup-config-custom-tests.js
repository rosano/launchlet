const { throws, deepEqual } = require('assert');

const mod = require('./rollup-config-custom.js');

describe('LCHPackageRollupConfigCustom', function test_LCHPackageRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHPackageRollupConfigCustom(null);
		}, /LCHErrorInputNotValid/);
	});

	it('sets output.name', function() {
		deepEqual(mod.LCHPackageRollupConfigCustom({
			output: {},
			plugins: [],
		}).output.name, 'Launchlet');
	});

	it('sets output.file', function() {
		deepEqual(mod.LCHPackageRollupConfigCustom({
			output: {},
			plugins: [],
		}).output.file, require('path').join(__dirname, '__compiled/launchlet.js'));
	});

	it('removes livereload', function() {
		deepEqual(mod.LCHPackageRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
