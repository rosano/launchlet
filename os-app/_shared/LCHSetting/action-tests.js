const { rejects, deepEqual } = require('assert');

const mod = require('./action.js').default;

describe('LCHSettingsActionProperty', function test_LCHSettingsActionProperty() {

	it('rejects if param1 not string', async function() {
		await rejects(mod.LCHSettingsActionProperty(LCHTestingStorageClient, null));
	});

	it('returns undefined if param1 not found', async function() {
		deepEqual(await mod.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa'), undefined);
	});

	context('param2', function () {

		it('returns value if undefined', async function() {
			await mod.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa', 'bravo');

			deepEqual(await mod.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa'), 'bravo');
		});

		it('returns true and sets value', async function() {
			deepEqual(await mod.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa', 'bravo'), true);
		});
		
	});

});

describe('LCHSettingsActionDelete', function test_LCHSettingsActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mod.LCHSettingsActionDelete(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		await mod.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa', 'bravo');
		deepEqual(await mod.LCHSettingsActionDelete(LCHTestingStorageClient, 'alfa'), {
			statusCode: 200,
		});
	});

	it('deletes LCHSetting', async function() {
		await mod.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa', 'bravo');
		await mod.LCHSettingsActionDelete(LCHTestingStorageClient, 'alfa');
		deepEqual(await mod.LCHSettingsActionQuery(LCHTestingStorageClient, {}), []);
	});

});
