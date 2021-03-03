const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('LCHDocumentErrors', function test_LCHDocumentErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHDocumentErrors(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHDocumentID not string', function() {
		deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
			LCHDocumentID: null,
		})), {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHDocumentID not filled', function() {
		deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
			LCHDocumentID: ' ',
		})), {
			LCHDocumentID: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHDocumentCallbackBody not string', function() {
		deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
			LCHDocumentCallbackBody: null,
		})), {
			LCHDocumentCallbackBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHDocumentCreationDate not date', function() {
		deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
			LCHDocumentCreationDate: new Date('alfa'),
		})), {
			LCHDocumentCreationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns object if LCHDocumentModificationDate not date', function() {
		deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
			LCHDocumentModificationDate: new Date('alfa'),
		})), {
			LCHDocumentModificationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid()), null);
	});

	it('returns object if LCHOptionValidateIfNotPresent', function() {
		deepEqual(Array.isArray(Object.keys(mod.LCHDocumentErrors(StubDocumentObjectValid(), {
			LCHOptionValidateIfNotPresent: true,
		}))), true);
	});

	context('LCHDocumentCallbackArgs', function() {

		it('returns object if not string', function() {
			deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
				LCHDocumentCallbackArgs: null,
			})), {
				LCHDocumentCallbackArgs: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
				LCHDocumentCallbackArgs: 'alfa',
			})), null);
		});

	});

	context('LCHDocumentSyntaxErrorMessage', function() {

		it('returns object if not string', function() {
			deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
				LCHDocumentSyntaxErrorMessage: null,
			})), {
				LCHDocumentSyntaxErrorMessage: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
				LCHDocumentSyntaxErrorMessage: 'alfa',
			})), null);
		});

	});

	context('LCHDocumentCanonicalExampleCallbackBody', function() {

		it('returns object if not string', function() {
			deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
				LCHDocumentCanonicalExampleCallbackBody: null,
			})), {
				LCHDocumentCanonicalExampleCallbackBody: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHDocumentErrors(StubDocumentObjectValid({
				LCHDocumentCanonicalExampleCallbackBody: '',
			})), null);
		});

	});

});

describe('LCHDocumentDirectory', function test_LCHDocumentDirectory() {

	it('returns string', function() {
		deepEqual(mod.LCHDocumentDirectory(), 'lch_documents');
	});

});

describe('LCHDocumentObjectPath', function test_LCHDocumentObjectPath() {

	it('returns string', function() {
		const LCHDocumentID = Math.random().toString();
		deepEqual(mod.LCHDocumentObjectPath({
			LCHDocumentID,
		}), mod.LCHDocumentDirectory() + '/' + LCHDocumentID);
	});

});

describe('LCHDocumentStub', function test_LCHDocumentStub() {

	it('returns string', function() {
		const LCHDocumentID = Math.random().toString();
		deepEqual(mod.LCHDocumentStub(`${ mod.LCHDocumentDirectory() }/${ LCHDocumentID }`), {
			LCHDocumentID,
		});
	});

});

describe('LCHDocumentCreate', function test_LCHDocumentActCreate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(null)
		}, /LCHErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument({
			LCHDocumentCallbackBody: null,
		})), {
			LCHDocumentCallbackBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let item = await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument());

		deepEqual(item, uStubDocument({
			LCHDocumentID: item.LCHDocumentID,
			LCHDocumentCreationDate: item.LCHDocumentCreationDate,
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
		}));
	});

	it('sets LCHDocumentID to unique value', async function() {
		let items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument())).LCHDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets LCHDocumentCreationDate to now', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument())).LCHDocumentCreationDate < 100, true);
	});

	it('sets LCHDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument())).LCHDocumentModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const item = StubDocumentObjectValid();
		deepEqual(await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(Object.assign({}, item)), item);
	});

});

describe('LCHDocumentUpdate', function test_LCHDocumentActUpdate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.LCHDocument.LCHDocumentUpdate(null)
		}, /LCHErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.LCHDocument.LCHDocumentUpdate(Object.assign(await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument()), {
			LCHDocumentCallbackBody: null,
		})), {
			LCHDocumentCallbackBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let itemCreated = await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument());

		let item = await ZDRTestingWrap.App.LCHDocument.LCHDocumentUpdate(itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
		}));
	});

	it('sets LCHDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.LCHDocument.LCHDocumentUpdate(await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument()))).LCHDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await ZDRTestingWrap.App.LCHDocument.LCHDocumentUpdate(Object.assign(uStubDocument(), {
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
		deepEqual(await ZDRTestingWrap.App.LCHDocument.LCHDocumentList(), []);
	});

	it('returns array with existing items', async function() {
		const item = await ZDRTestingWrap.App.LCHDocument.LCHDocumentCreate(uStubDocument());
		deepEqual(await ZDRTestingWrap.App.LCHDocument.LCHDocumentList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.LCHDocumentErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.LCHDocumentObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.LCHDocumentStub);
	});

});

