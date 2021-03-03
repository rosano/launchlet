const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('LCHSettingDirectory', function test_LCHSettingDirectory() {

	it('returns string', function() {
		deepEqual(mod.LCHSettingDirectory(), 'lch_settings');
	});

});

describe('ZDRSchemaStub', function ZDRSchemaStub() {

	it('returns string', function() {
		const LCHSettingKey = Math.random().toString();
		deepEqual(mod.ZDRSchemaStub(`${ mod.LCHSettingDirectory() }/${ LCHSettingKey }`), {
			LCHSettingKey,
		});
	});

});

describe('ZDRSchemaPath', function ZDRSchemaPath() {

	it('returns string', function() {
		const LCHSettingKey = Math.random().toString();
		deepEqual(mod.ZDRSchemaPath({
			LCHSettingKey,
		}), mod.LCHSettingDirectory() + '/' + LCHSettingKey);
	});

});

describe('ZDRSchemaDispatchValidate', function test_ZDRSchemaDispatchValidate() {

	it('throws error if not object', function() {
		throws(function() {
			mod.ZDRSchemaDispatchValidate(null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if not object', function() {
		throws(function() {
			mod.ZDRSchemaDispatchValidate(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHSettingKey not string', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubSettingObjectValid({
			LCHSettingKey: null,
		})), {
			LCHSettingKey: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHSettingKey not filled', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubSettingObjectValid({
			LCHSettingKey: ' ',
		})), {
			LCHSettingKey: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHSettingValue not string', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubSettingObjectValid({
			LCHSettingValue: null,
		})), {
			LCHSettingValue: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubSettingObjectValid()), null);
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
