exports.LCHGuideExampleFormatted = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	let outputData = Object.assign({}, inputData);

	for (let key in outputData) {
		if (key === 'LCHDocumentBody') {
			outputData[key] = '```' + outputData[key] + '```'
		};
	}

	return outputData
};

exports.LCHGuideExampleQuoted = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.entries(inputData).map(function (e) {
		e[0] = `> **${ e[0] }**`;
		e[1] = `>> ${ e[1] }`;

		return e.join('\n');
	})
};
