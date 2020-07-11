const mod = {

	LCHSettingModelErrorsFor (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.LCHSettingKey !== 'string') {
			errors.LCHSettingKey = [
				'LCHErrorNotString',
			];
		} else if (inputData.LCHSettingKey.trim() === '') {
			errors.LCHSettingKey = [
				'LCHErrorNotFilled',
			];
		}

		if (typeof inputData.LCHSettingValue !== 'string') {
			errors.LCHSettingValue = [
				'LCHErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
