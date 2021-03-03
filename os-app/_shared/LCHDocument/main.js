import LCHFormula from '../LCHFormula/main.js';
import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	LCHDocumentErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		const errors = LCHFormula.LCHFormulaTo(LCHFormula.LCHFormulaErrors(LCHFormula.LCHFormulaFrom(inputData)) || {}, 'LCHDocument');

		if (typeof inputData.LCHDocumentID !== 'string') {
			errors.LCHDocumentID = [
				'LCHErrorNotString',
			];
		} else if (!inputData.LCHDocumentID.trim()) {
			errors.LCHDocumentID = [
				'LCHErrorNotFilled',
			];
		}

		if (typeof inputData.LCHDocumentCallbackBody !== 'string') {
			errors.LCHDocumentCallbackBody = [
				'LCHErrorNotString',
			];
		}

		if (!(inputData.LCHDocumentCreationDate instanceof Date) || Number.isNaN(inputData.LCHDocumentCreationDate.getTime())) {
			errors.LCHDocumentCreationDate = [
				'LCHErrorNotDate',
			];
		}

		if (!(inputData.LCHDocumentModificationDate instanceof Date) || Number.isNaN(inputData.LCHDocumentModificationDate.getTime())) {
			errors.LCHDocumentModificationDate = [
				'LCHErrorNotDate',
			];
		}

		if (inputData.LCHDocumentCallbackArgs !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHDocumentCallbackArgs !== 'string') {
				errors.LCHDocumentCallbackArgs = [
					'LCHErrorNotString',
				];
			}
		}

		if (inputData.LCHDocumentSyntaxErrorMessage !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHDocumentSyntaxErrorMessage !== 'string') {
				errors.LCHDocumentSyntaxErrorMessage = [
					'LCHErrorNotString',
				];
			}
		}

		if (inputData.LCHDocumentCanonicalExampleCallbackBody !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHDocumentCanonicalExampleCallbackBody !== 'string') {
				errors.LCHDocumentCanonicalExampleCallbackBody = [
					'LCHErrorNotString',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	LCHDocumentDirectory () {
		return 'lch_documents';
	},

	LCHDocumentObjectPath (inputData) {
		return `${ mod.LCHDocumentDirectory() }/${ inputData.LCHDocumentID }`;
	},

	LCHDocumentStub (inputData) {
		return {
			LCHDocumentID: inputData.split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'LCHDocument',
	ZDRSchemaDispatchValidate: mod.LCHDocumentErrors,
	ZDRSchemaPath: mod.LCHDocumentObjectPath,
	ZDRSchemaStub: mod.LCHDocumentStub,
	ZDRSchemaMethods: {
		
		LCHDocumentCreate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			const LCHDocumentCreationDate = new Date();

			return this.App.LCHDocument.ZDRModelWriteObject(Object.assign(inputData, Object.assign({
				LCHDocumentID: uniqueID(),
				LCHDocumentCreationDate,
				LCHDocumentModificationDate: LCHDocumentCreationDate,
			}, inputData)));
		},

		LCHDocumentUpdate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			return this.App.LCHDocument.ZDRModelWriteObject(Object.assign(inputData, {
				LCHDocumentModificationDate: new Date(),
			}));
		},

		async LCHDocumentList () {
			return Object.values(await this.App.LCHDocument.ZDRModelListObjects()).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse);
		},

	},
});
