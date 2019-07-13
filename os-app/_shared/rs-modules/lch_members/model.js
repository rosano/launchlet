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
