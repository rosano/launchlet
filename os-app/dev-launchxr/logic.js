const mod = {

	LCHLaunchxrModeCommand () {
		return 'kLCHLaunchxrModeCommand';
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
			mod.LCHLaunchxrModeCommand(),
			mod.LCHLaunchxrModePreview(),
			mod.LCHLaunchxrModePipe(),
			mod.LCHLaunchxrModeTask(),
		];
	},

};

export default mod;
