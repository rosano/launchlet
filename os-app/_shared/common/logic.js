const mod = {

	LCHSharedDonateLinkGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!(inputData.LCH_SHARED_DONATE_URL || '').trim()) {
			return new Error('LCH_SHARED_DONATE_URL not defined');
		}
	},

};

Object.assign(exports, mod)