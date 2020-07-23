const mod = {

	LCHRuntimeURLFilter (param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!param2) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (param1 === '*') {
			return true;
		}

		let match = param1.match(/^\/(.*)\/(\w*)/i);

		if (!match || !match.shift()) {
			return param2.includes(param1);
		}

		return !!param2.match(new RegExp(match[0], match[1]));
	},

	LCHRuntimeInputTypes(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return inputData.split(',').map(function (e) {
			return e.trim();
		}).filter(function (e) {
			return !!e;
		});
	},

	LCHRuntimeAPI(inputData) {
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

					(item.LCHRecipeInputTypes ? mod.LCHRuntimeInputTypes(item.LCHRecipeInputTypes) : []).forEach(function (e, i) {
						if (!coll[e](args[i])) {
							throw new Error('LCHErrorTypeMismatch');
						}
					});

					return item.LCHRecipeCallback.apply({
						api: outputData,
					}, args);
				};
			}

			return coll;
		}, {}));

		Object.freeze(outputData);

		return outputData;
	},

};

export default mod;
