exports.LCHGuideExampleFormatted = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	let outputData = Object.assign({}, inputData);

	for (let key in outputData) {
		if (key === 'LCHDocumentCallbackBody') {
			outputData[key] = '<code>' + outputData[key] + '</code>'
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
		return `<dt>${ OLSKLocalized(e[0]) }</dt><dd>${ e[1] }</dd>`;
	});
};

exports.LCHGuideExampleTemplate = function (inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	return `<dl class="OLSKDecorGlossary">\n\n${ inputData.join('\n\n') }\n\n</dl>`;
};

exports.LCHGuideStringify = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	return JSON.stringify(inputData, null, ' ').replace(/"(\w+)":/g, "$1:")
};
