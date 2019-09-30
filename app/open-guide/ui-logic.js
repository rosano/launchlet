exports.LCHGuideExampleFormatted = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	let outputData = Object.assign({}, inputData);

	for (let key in outputData) {
		if (key === 'LCHDocumentCallbackBody') {
			outputData[key] = '```' + outputData[key] + '```'
		};
	}

	return outputData
};

exports.LCHGuideExampleQuoted = function (inputData, OLSKLocalized = function (inputData) {
	return inputData
}) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	return Object.entries(inputData).map(function (e) {
		e[0] = `> **${ OLSKLocalized(e[0]) }**`;
		e[1] = `>> ${ e[1] }`;

		return e.join('\n');
	})
};

exports.LCHGuideExampleTemplate = function (inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	return `<div class="LCHGuideExample">\n\n${ inputData.join('\n\n') }\n\n</div>`;
};

exports.LCHGuideStringify = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	return JSON.stringify(inputData, null, ' ').replace(/"(\w+)":/g, "$1:")
};
