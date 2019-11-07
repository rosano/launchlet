const mod = {

	LCHVitrineRouteGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!(inputData.LCH_VITRINE_QUICKSILVER_URL || '').trim()) {
			return new Error('LCH_VITRINE_QUICKSILVER_URL not defined');
		}
	},

};

Object.assign(exports, mod)
