export const LCHBuildFunctionString = function(param1, param2 = '') {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return `function (${ param2 }) { ${ param1 } }`;
};

export const LCHBuildConvertDocumentFunctions = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	return Object.keys(inputData).reduce(function (coll, item) {
		if (item.match('LCHDocumentCallback')) {
			coll.LCHDocumentCallback = LCHBuildFunctionString(inputData.LCHDocumentCallbackBody, inputData.LCHDocumentCallbackArgs);
		} else if (item === 'LCHDocumentCanonicalExampleCallbackBody') {
			coll.LCHDocumentCanonicalExampleCallback = LCHBuildFunctionString(inputData.LCHDocumentCanonicalExampleCallbackBody);
		} else  {
			coll[item] = inputData[item];
		}

		return coll;
	}, {});
};

export const LCHBuildObjectString = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	let substitutions = {};

	const outputData = Object.keys(inputData).reduce(function (coll, item) {
		if (typeof inputData[item] === 'string' && inputData[item].indexOf('function') === 0) {
			coll[item] = `__${ item }__`;

			substitutions[item] = inputData[item];
		}

		if (!coll[item]) {
			coll[item] = inputData[item];
		};

		return coll;
	}, {});

	return Object.keys(substitutions).reduce(function (coll, item) {
		return coll.replace(`"__${ item }__"`, substitutions[item]);
	}, JSON.stringify(outputData));
};
