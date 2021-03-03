const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('LCHSettingErrors', function test_LCHSettingErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHSettingErrors(null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHSettingErrors(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHSettingKey not string', function() {
		deepEqual(mod.LCHSettingErrors(StubSettingObjectValid({
			LCHSettingKey: null,
		})), {
			LCHSettingKey: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHSettingKey not filled', function() {
		deepEqual(mod.LCHSettingErrors(StubSettingObjectValid({
			LCHSettingKey: ' ',
		})), {
			LCHSettingKey: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHSettingValue not string', function() {
		deepEqual(mod.LCHSettingErrors(StubSettingObjectValid({
			LCHSettingValue: null,
		})), {
			LCHSettingValue: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.LCHSettingErrors(StubSettingObjectValid()), null);
	});

});

describe('LCHSettingDirectory', function test_LCHSettingDirectory() {

	it('returns string', function() {
		deepEqual(mod.LCHSettingDirectory(), 'lch_settings');
	});

});

describe('LCHSettingObjectPath', function test_LCHSettingObjectPath() {

	it('returns string', function() {
		const LCHSettingKey = Math.random().toString();
		deepEqual(mod.LCHSettingObjectPath({
			LCHSettingKey,
		}), mod.LCHSettingDirectory() + '/' + LCHSettingKey);
	});

});

describe('LCHSettingStub', function test_LCHSettingStub() {

	it('returns string', function() {
		const LCHSettingKey = Math.random().toString();
		deepEqual(mod.LCHSettingStub(`${ mod.LCHSettingDirectory() }/${ LCHSettingKey }`), {
			LCHSettingKey,
		});
	});

});

describe('LCHSettingList', function test_LCHSettingActList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.LCHSetting.LCHSettingList(), []);
	});

	it('returns array with existing items', async function() {
		const item = await ZDRTestingWrap.App.LCHSetting.ZDRModelWriteObject(StubSettingObjectValid());
		deepEqual(await ZDRTestingWrap.App.LCHSetting.LCHSettingList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.LCHSettingErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.LCHSettingObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.LCHSettingStub);
	});

});

