const { throws, rejects, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const LCHDocument = require('../LCHDocument/main.js').default;

describe('LCHTransportImport', function test_LCHTransportImport() {

	it('rejects if not object', async function () {
		await rejects(ZDRTestingWrap.App.LCHTransport.LCHTransportImport(null), /LCHErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.LCHTransport.LCHTransportImport({}), {});
	});

	context('LCHDocument', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.LCHTransport.LCHTransportImport({
				LCHDocument: null,
			}), /LCHErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.LCHTransport.LCHTransportImport({
				LCHDocument: [StubDocumentObjectValid({
					LCHDocumentName: null,
				})],
			}), /LCHErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubDocumentObjectValid()
			strictEqual((await ZDRTestingWrap.App.LCHTransport.LCHTransportImport({
				LCHDocument: [item],
			})).LCHDocument.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubDocumentObjectValid();

			await ZDRTestingWrap.App.LCHTransport.LCHTransportImport({
				LCHDocument: [item],
			});

			deepEqual(await ZDRTestingWrap.App.LCHDocument.LCHDocumentList(), [item]);
		});
	
	});

	context('LCHSetting', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.LCHTransport.LCHTransportImport({
				LCHSetting: null,
			}), /LCHErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.LCHTransport.LCHTransportImport({
				LCHSetting: [StubSettingObjectValid({
					LCHSettingKey: null,
				})],
			}), /LCHErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubSettingObjectValid()
			strictEqual((await ZDRTestingWrap.App.LCHTransport.LCHTransportImport({
				LCHSetting: [item],
			})).LCHSetting.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubSettingObjectValid();

			await ZDRTestingWrap.App.LCHTransport.LCHTransportImport({
				LCHSetting: [item],
			});

			deepEqual(await ZDRTestingWrap.App.LCHSetting.LCHSettingList(), [item]);
		});
	
	});

});

describe('LCHTransportExport', function test_LCHTransportExport() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.LCHTransport.LCHTransportExport(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(ZDRTestingWrap.App.LCHTransport.LCHTransportExport({}), {});
	});

	context('LCHDocument', function () {

		it('throws if not array', function () {
			throws(function () {
				ZDRTestingWrap.App.LCHTransport.LCHTransportExport({
					LCHDocument: null,
				});
			}, /LCHErrorInputNotValid/);
		});

		it('copies input', function () {
			const item = StubDocumentObjectValid();
			notStrictEqual((ZDRTestingWrap.App.LCHTransport.LCHTransportExport({
				LCHDocument: [item],
			})).LCHDocument.shift(), item);
		});

		it('strips dynamic attributes', function () {
			const item = StubDocumentObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((ZDRTestingWrap.App.LCHTransport.LCHTransportExport({
				LCHDocument: [item],
			})).LCHDocument.shift().$alfa, undefined);
		});
	
	});

	context('LCHSetting', function () {

		it('throws if not array', function () {
			throws(function () {
				ZDRTestingWrap.App.LCHTransport.LCHTransportExport({
					LCHSetting: null,
				});
			}, /LCHErrorInputNotValid/);
		});

		it('copies input', function () {
			const item = StubSettingObjectValid();
			notStrictEqual((ZDRTestingWrap.App.LCHTransport.LCHTransportExport({
				LCHSetting: [item],
			})).LCHSetting.shift(), item);
		});

		it('strips dynamic attributes', function () {
			const item = StubSettingObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((ZDRTestingWrap.App.LCHTransport.LCHTransportExport({
				LCHSetting: [item],
			})).LCHSetting.shift().$alfa, undefined);
		});
	
	});

});
