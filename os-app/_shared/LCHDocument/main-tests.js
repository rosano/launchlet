const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('LCHDocumentDirectory', function test_LCHDocumentDirectory() {

	it('returns string', function() {
		deepEqual(mod.LCHDocumentDirectory(), 'lch_documents');
	});

});

describe('ZDRSchemaStub', function ZDRSchemaStub() {

	it('returns string', function() {
		const LCHDocumentID = Math.random().toString();
		deepEqual(mod.ZDRSchemaStub(`${ mod.LCHDocumentDirectory() }/${ LCHDocumentID }`), {
			LCHDocumentID,
		});
	});

});

describe('ZDRSchemaPath', function ZDRSchemaPath() {

	it('returns string', function() {
		const LCHDocumentID = Math.random().toString();
		deepEqual(mod.ZDRSchemaPath({
			LCHDocumentID,
		}), mod.LCHDocumentDirectory() + '/' + LCHDocumentID);
	});

});

describe('ZDRSchemaDispatchValidate', function test_ZDRSchemaDispatchValidate() {

	it('throws error if not object', function() {
		throws(function() {
			mod.ZDRSchemaDispatchValidate(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHDocumentID not string', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
			LCHDocumentID: null,
		})), {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHDocumentID not filled', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
			LCHDocumentID: ' ',
		})), {
			LCHDocumentID: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHDocumentCallbackBody not string', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
			LCHDocumentCallbackBody: null,
		})), {
			LCHDocumentCallbackBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHDocumentCreationDate not date', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
			LCHDocumentCreationDate: new Date('alfa'),
		})), {
			LCHDocumentCreationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns object if LCHDocumentModificationDate not date', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
			LCHDocumentModificationDate: new Date('alfa'),
		})), {
			LCHDocumentModificationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid()), null);
	});

	it('returns object if LCHOptionValidateIfNotPresent', function() {
		deepEqual(Array.isArray(Object.keys(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid(), {
			LCHOptionValidateIfNotPresent: true,
		}))), true);
	});

	context('LCHDocumentCallbackArgs', function() {

		it('returns object if not string', function() {
			deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
				LCHDocumentCallbackArgs: null,
			})), {
				LCHDocumentCallbackArgs: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
				LCHDocumentCallbackArgs: 'alfa',
			})), null);
		});

	});

	context('LCHDocumentSyntaxErrorMessage', function() {

		it('returns object if not string', function() {
			deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
				LCHDocumentSyntaxErrorMessage: null,
			})), {
				LCHDocumentSyntaxErrorMessage: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
				LCHDocumentSyntaxErrorMessage: 'alfa',
			})), null);
		});

	});

	context('LCHDocumentCanonicalExampleCallbackBody', function() {

		it('returns object if not string', function() {
			deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
				LCHDocumentCanonicalExampleCallbackBody: null,
			})), {
				LCHDocumentCanonicalExampleCallbackBody: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.ZDRSchemaDispatchValidate(StubDocumentObjectValid({
				LCHDocumentCanonicalExampleCallbackBody: '',
			})), null);
		});

	});

});

describe('LCHDocumentCreate', function test_LCHDocumentActCreate() {

	it('throws if not object', function () {
		throws(function () {
			LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(null)
		}, /LCHErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument({
			LCHDocumentCallbackBody: null,
		})), {
			LCHDocumentCallbackBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let item = await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument());

		deepEqual(item, uStubDocument({
			LCHDocumentID: item.LCHDocumentID,
			LCHDocumentCreationDate: item.LCHDocumentCreationDate,
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
		}));
	});

	it('sets LCHDocumentID to unique value', async function() {
		let items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument())).LCHDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets LCHDocumentCreationDate to now', async function() {
		deepEqual(new Date() - (await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument())).LCHDocumentCreationDate < 100, true);
	});

	it('sets LCHDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument())).LCHDocumentModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const item = StubDocumentObjectValid();
		deepEqual(await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(Object.assign({}, item)), item);
	});

});

describe('LCHDocumentUpdate', function test_LCHDocumentActUpdate() {

	it('throws if not object', function () {
		throws(function () {
			LCHTestingWrap.App.LCHDocument.LCHDocumentUpdate(null)
		}, /LCHErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(LCHTestingWrap.App.LCHDocument.LCHDocumentUpdate(Object.assign(await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument()), {
			LCHDocumentCallbackBody: null,
		})), {
			LCHDocumentCallbackBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let itemCreated = await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument());

		let item = await LCHTestingWrap.App.LCHDocument.LCHDocumentUpdate(itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
		}));
	});

	it('sets LCHDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await LCHTestingWrap.App.LCHDocument.LCHDocumentUpdate(await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument()))).LCHDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await LCHTestingWrap.App.LCHDocument.LCHDocumentUpdate(Object.assign(uStubDocument(), {
			LCHDocumentID: 'alfa',
			LCHDocumentCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(uStubDocument(), {
			LCHDocumentID: item.LCHDocumentID,
			LCHDocumentCallbackBody: item.LCHDocumentCallbackBody,
			LCHDocumentCreationDate: item.LCHDocumentCreationDate,
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
		}));
	});

});

describe('LCHDocumentList', function test_LCHDocumentActList() {

	it('returns array', async function() {
		deepEqual(await LCHTestingWrap.App.LCHDocument.LCHDocumentList(), []);
	});

	it('returns array with existing items', async function() {
		const item = await LCHTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument());
		deepEqual(await LCHTestingWrap.App.LCHDocument.LCHDocumentList(), [item]);
	});

});
