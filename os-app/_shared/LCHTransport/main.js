import OLSKRemoteStorage from 'OLSKRemoteStorage';

export default {
	ZDRSchemaKey: 'LCHTransport',
	ZDRSchemaDispatchValidate: (function () {}),
	ZDRSchemaPath: (function () {}),
	ZDRSchemaStub: (function () {}),
	ZDRSchemaMethods: {

		async LCHTransportImport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			const _this = this;

			return Object.fromEntries(await Promise.all(Object.entries(inputData).map(async function ([key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('LCHErrorInputNotValid');
				}

				return [key, await ({
					LCHDocument: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.LCHDocument.LCHDocumentCreate(e).catch(function () {
								throw new Error('LCHErrorInputNotValid');
							});
						}));
					}),
					LCHSetting: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.LCHSetting.ZDRModelWriteObject(e).catch(function () {
								throw new Error('LCHErrorInputNotValid');
							});
						}));
					}),
				}[key]())];
			})));
		},

		LCHTransportExport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			return Object.entries(inputData).reduce(function (coll, [key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('LCHErrorInputNotValid');
				}

				if (!value.length) {
					return coll;
				}
				
				return Object.assign(coll, {
					[key]: value.map(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy)
				});
			}, {});
		},

	},
};
