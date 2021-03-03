const mod = {

	LCHSettingErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.LCHSettingKey !== 'string') {
			errors.LCHSettingKey = [
				'LCHErrorNotString',
			];
		} else if (!inputData.LCHSettingKey.trim()) {
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

	LCHSettingDirectory () {
		return 'lch_settings';
	},

	LCHSettingObjectPath (inputData) {
		return `${ mod.LCHSettingDirectory() }/${ inputData.LCHSettingKey }`;
	},

	LCHSettingStub (inputData) {
		return {
			LCHSettingKey: inputData.split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'LCHSetting',
	ZDRSchemaDispatchValidate: mod.LCHSettingErrors,
	ZDRSchemaPath: mod.LCHSettingObjectPath,
	ZDRSchemaStub: mod.LCHSettingStub,
	ZDRSchemaMethods: {
		
		async LCHSettingList () {
			return Object.values(await this.App.LCHSetting.ZDRModelListObjects());
		},

	},
});

