const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHSaveFileCallback', function test_LCHSaveFileCallback() {

	it('throws if param1 not string', function () {
		throws(function () {
			mod.LCHSaveFileCallback(null, 'alfa');
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.LCHSaveFileCallback('', null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not filled', function () {
		throws(function () {
			mod.LCHSaveFileCallback('', ' ');
		}, /LCHErrorInputNotValid/);
	});

});

describe('LCHSaveFileRecipe', function test_LCHSaveFileRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHSaveFileRecipe(), {
			LCHRecipeSignature: 'LCHSaveFile',
			LCHRecipeCallback: mod.LCHSaveFileCallback,
		});
	});

});
