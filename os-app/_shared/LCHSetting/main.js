const mod = {

	ZDRSchemaKey: 'LCHSetting',

	LCHSettingDirectory () {
		return 'lch_settings';
	},

	ZDRSchemaStub (inputData) {
		return {
			LCHSettingKey: inputData.split('/').pop(),
		};
	},

	ZDRSchemaPath (inputData) {
		return `${ mod.LCHSettingDirectory() }/${ inputData.LCHSettingKey }`;
	},

	ZDRSchemaDispatchValidate (inputData, options = {}) {
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

	ZDRSchemaMethods: {
		
		async LCHSettingList () {
			return Object.values(await this.App.LCHSetting.ZDRModelListObjects());
		},

	},

};

export default mod;
