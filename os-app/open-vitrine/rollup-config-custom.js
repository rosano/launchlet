const pathPackage = require('path');

module.exports = {
	LCHVitrineRollupConfigCustom (inputData, options) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		inputData.output.name = 'LCHVitrineBehaviour';
		
		return inputData;
	},
	OLSKRollupConfigCustom (inputData, options) {
		return module.exports.LCHVitrineRollupConfigCustom(inputData, options);
	},
};
