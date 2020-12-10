const { throws, deepEqual } = require('assert');

const mod = require('./model.js').default;

const kTesting = {
	StubSettingObjectValid: function() {
		return {
			LCHSettingKey: 'alfa',
			LCHSettingValue: 'bravo',
		};
	},
};

describe('LCHSettingModelErrorsFor', function test_LCHSettingModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHSettingModelErrorsFor(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHSettingKey not string', function() {
		deepEqual(mod.LCHSettingModelErrorsFor(Object.assign(kTesting.StubSettingObjectValid(), {
			LCHSettingKey: null,
		})), {
			LCHSettingKey: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHSettingKey not filled', function() {
		deepEqual(mod.LCHSettingModelErrorsFor(Object.assign(kTesting.StubSettingObjectValid(), {
			LCHSettingKey: ' ',
		})), {
			LCHSettingKey: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHSettingValue not string', function() {
		deepEqual(mod.LCHSettingModelErrorsFor(Object.assign(kTesting.StubSettingObjectValid(), {
			LCHSettingValue: null,
		})), {
			LCHSettingValue: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.LCHSettingModelErrorsFor(kTesting.StubSettingObjectValid()), null);
	});

});
