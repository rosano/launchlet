const mod = {

	LCHLaunchxrModeCommit () {
		return 'kLCHLaunchxrModeCommit';
	},

	LCHLaunchxrModePreview () {
		return 'kLCHLaunchxrModePreview';
	},

	LCHLaunchxrModePipe () {
		return 'kLCHLaunchxrModePipe';
	},

	LCHLaunchxrModeTask () {
		return 'kLCHLaunchxrModeTask';
	},

	LCHLaunchxrModes () {
		return [
			mod.LCHLaunchxrModeCommit(),
			mod.LCHLaunchxrModePreview(),
			mod.LCHLaunchxrModePipe(),
			mod.LCHLaunchxrModeTask(),
		];
	},

};

export default mod;
