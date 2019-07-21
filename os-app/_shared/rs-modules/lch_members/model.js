export const LCHMembersModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	var errors = {};

	if (typeof inputData.LCHMemberID !== 'string') {
		errors.LCHMemberID = [
			'LCHErrorNotString',
		];
	} else if (inputData.LCHMemberID.trim() === '') {
		errors.LCHMemberID = [
			'LCHErrorNotFilled',
		];
	}

	if (typeof inputData.LCHMemberArgs !== 'string') {
		errors.LCHMemberArgs = [
			'LCHErrorNotString',
		];
	}

	if (typeof inputData.LCHMemberBody !== 'string') {
		errors.LCHMemberBody = [
			'LCHErrorNotString',
		];
	}

	if (!(inputData.LCHMemberCreationDate instanceof Date) || Number.isNaN(inputData.LCHMemberCreationDate.getTime())) {
		errors.LCHMemberCreationDate = [
			'LCHErrorNotDate',
		];
	}

	if (!(inputData.LCHMemberModificationDate instanceof Date) || Number.isNaN(inputData.LCHMemberModificationDate.getTime())) {
		errors.LCHMemberModificationDate = [
			'LCHErrorNotDate',
		];
	}

	if (inputData.LCHMemberName !== undefined) {
		if (typeof inputData.LCHMemberName !== 'string') {
			errors.LCHMemberName = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHMemberSignature !== undefined) {
		if (typeof inputData.LCHMemberSignature !== 'string') {
			errors.LCHMemberSignature = [
				'LCHErrorNotString',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

export const LCHMembersModelPreJSONSchemaValidate = function(inputData) {
	if (inputData.LCHMemberCreationDate) {
		inputData.LCHMemberCreationDate = inputData.LCHMemberCreationDate.toISOString();
	}

	if (inputData.LCHMemberModificationDate) {
		inputData.LCHMemberModificationDate = inputData.LCHMemberModificationDate.toISOString();
	}

	return inputData;
};

export const LCHMembersModelPostJSONParse = function(inputData) {
	if (!inputData) {
		return inputData;
	}

	if (inputData.LCHMemberCreationDate) {
		inputData.LCHMemberCreationDate = new Date(inputData.LCHMemberCreationDate);
	}

	if (inputData.LCHMemberModificationDate) {
		inputData.LCHMemberModificationDate = new Date(inputData.LCHMemberModificationDate);
	}

	return inputData;
};

export const LCHMembersModelConvertLegacy = function(inputData) {
	return {
		id: inputData.LCHMemberSignature || inputData.LCHMemberID,
		fnbody: inputData.LCHMemberBody,
		name: inputData.LCHMemberName,
	};
};

export const LCHMembersModelErrorsForUnwrappedMemberObject = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	let errorsHash = {};

	if (typeof inputData.id !== 'string') {
		errorsHash.id = new Error('LCHErrorNotString');
	}

	if (typeof inputData.fnbody !== 'string') {
		errorsHash.fnbody = new Error('LCHErrorNotString');
	}

	if (inputData.name !== undefined) {
		if (typeof inputData.name !== 'string') {
			errorsHash.name = new Error('LCHErrorNotString');
		}
	}

	if (inputData.args !== undefined) {
		if (typeof inputData.args !== 'string') {
			errorsHash.args = new Error('LCHErrorNotString');
		}
	}

	return Object.keys(errorsHash).length ? errorsHash : null;
};

export const LCHMembersModelWrappedMemberObjectFor = function (inputData) {
	if (exports.LCHMembersModelErrorsForUnwrappedMemberObject(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.keys(inputData).reduce(function (coll, e) {
		if (e === 'args') {
			return coll;
		}

		if (e === 'fnbody') {
			return Object.assign(coll, {
				fnclosure: `function (${ inputData.args || '' }) { ${ inputData.fnbody } }`,
			});
		}

		coll[e] = inputData[e];

		return coll;
	}, {});
};
