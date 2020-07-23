const mod = {

	LCHLauncherModeCommand () {
		return 'kLCHLauncherModeCommand';
	},

	LCHLauncherModePreview () {
		return 'kLCHLauncherModePreview';
	},

	LCHLauncherModePipe () {
		return 'kLCHLauncherModePipe';
	},

	LCHLauncherModeTask () {
		return 'kLCHLauncherModeTask';
	},

	LCHLauncherModes () {
		return [
			mod.LCHLauncherModeCommand(),
			mod.LCHLauncherModePreview(),
			mod.LCHLauncherModePipe(),
			mod.LCHLauncherModeTask(),
		];
	},

	LCHLauncherFilterFunction (fuzzysortPackage, param1, param2) {
		if (typeof fuzzysortPackage.go !== 'function') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('LCHErrorInputNotValid');
		}

		return fuzzysortPackage.go(param1, param2, {
			key: 'LCHRecipeName',
		}).sort(function (a, b) {
			return a.score < b.score ? 1 : (a.score > b.score ? -1 : 0);
		}).map(function (e) {
			return e.obj;
		});
	},

};

export default mod;
