const { throws, deepEqual } = require('assert');

const mainModule = require('./rollup-config-custom.js');

describe('LCHPackageRollupConfigCustom', function testLCHPackageRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHPackageRollupConfigCustom(null);
		}, /LCHErrorInputNotValid/);
	});

	it('sets output.name', function() {
		deepEqual(mainModule.LCHPackageRollupConfigCustom({
			output: {},
			plugins: [],
		}).output.name, 'Launchlet');
	});

	it('sets output.file', function() {
		deepEqual(mainModule.LCHPackageRollupConfigCustom({
			output: {},
			plugins: [],
		}).output.file, require('path').join(__dirname, '__compiled/launchlet.js'));
	});

	it('removes livereload', function() {
		deepEqual(mainModule.LCHPackageRollupConfigCustom({
			output: {},
			plugins: [{
				name: 'livereload',
			}],
		}).plugins, []);
	});

});
