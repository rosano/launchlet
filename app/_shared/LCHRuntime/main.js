export const LCHRuntimeInputTypes = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return inputData.split(',').map(function (e) {
		return e.trim();
	}).filter(function (e) {
		return !!e;
	});
};

export const LCHRuntimeAPI = function(inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	const outputData = {
		fn (signature) {
			if (typeof signature !== 'string') {
				throw new Error('LCHErrorIdentifierNotString');
			}

			if (signature === '') {
				throw new Error('LCHErrorIdentifierBlank');
			}

			if (signature.trim() !== signature) {
				throw new Error('LCHErrorIdentifierContainsUntrimmedWhitespace');
			}

			let functionObject = inputData.filter(function (e) {
				return e.LCHRecipeSignature === signature;
			}).shift();

			if (!functionObject) {
				throw new Error('LCHErrorIdentifierNotDefined');
			}

			return functionObject.LCHRecipeCallback.bind({
				api: outputData,
			});
		},
	};

	Object.assign(outputData, inputData.reduce(function (coll, item) {
		if (!coll[item.LCHRecipeSignature]) {
			coll[item.LCHRecipeSignature] = function () {
				const args = arguments;

				(item.LCHRecipeInputTypes ? LCHRuntimeInputTypes(item.LCHRecipeInputTypes) : []).forEach(function (e, i) {
					if (!coll[e](args[i])) {
						throw new Error('LCHErrorTypeMismatch')
					};
				})

				return item.LCHRecipeCallback.apply({
					api: outputData,
				}, args);
			};
		}

		return coll;
	}, {}));

	Object.freeze(outputData);

	return outputData;
};
