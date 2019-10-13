import { rejects, deepEqual } from 'assert';

import * as mainModule from './action.js';

describe('LCHSettingsActionProperty', function testLCHSettingsActionProperty() {

	it('rejects if param1 not string', async function() {
		await rejects(mainModule.LCHSettingsActionProperty(LCHTestingStorageClient, null));
	});

	it('returns undefined if param1 not found', async function() {
		deepEqual(await mainModule.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa'), undefined);
	});

	context('param2', function () {

		it('returns value if undefined', async function() {
			await mainModule.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa', 'bravo');

			deepEqual(await mainModule.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa'), 'bravo');
		});

		it('returns true and sets value', async function() {
			deepEqual(await mainModule.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa', 'bravo'), true);
		});

	});

});

describe('LCHSettingsActionDelete', function testLCHSettingsActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHSettingsActionDelete(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		await mainModule.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa', 'bravo');
		deepEqual(await mainModule.LCHSettingsActionDelete(LCHTestingStorageClient, 'alfa'), {
			statusCode: 200,
		});
	});

	it('deletes LCHSetting', async function() {
		await mainModule.LCHSettingsActionProperty(LCHTestingStorageClient, 'alfa', 'bravo');
		await mainModule.LCHSettingsActionDelete(LCHTestingStorageClient, 'alfa');
		deepEqual(await mainModule.LCHSettingsActionQuery(LCHTestingStorageClient, {}), []);
	});

});
