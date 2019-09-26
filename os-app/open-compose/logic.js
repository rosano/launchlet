const mod = {

	LCHComposeRouteGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw 'RCSErrorInputInvalid';
		}

		if (!inputData.LCH_COMPOSE_DONATE_URL) {
			return new Error('LCH_COMPOSE_DONATE_URL not defined');
		}

		if (!inputData.LCH_COMPOSE_DONATE_URL.trim()) {
			return new Error('LCH_COMPOSE_DONATE_URL blank');
		}
	},

};

Object.assign(exports, mod)
