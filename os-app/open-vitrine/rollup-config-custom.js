const pathPackage = require('path');

module.exports = {
	LCHVitrineRollupConfigCustom (inputData, options) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		inputData.output.name = 'LCHVitrineBehaviour';
		
		inputData.plugins.splice(inputData.plugins.indexOf(inputData.plugins.filter(function (e) {
			if (typeof e !== 'object') {
				return false;
			};

			return e.name === 'livereload';
		}).pop()), 1);

		return inputData;
	},
	OLSKRollupConfigCustom (inputData, options) {
		return module.exports.LCHVitrineRollupConfigCustom(inputData, options);
	},
};
