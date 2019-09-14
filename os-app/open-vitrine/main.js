export const mod = {

	// INTERFACE

	InterfaceDemoButtonCommitDidClick() {
		setTimeout(function () {
			mod.CommandDemoCommit();
		})
	},

	// COMMAND

	CommandDemoCommit() {
		Launchlet.instanceCreate([
		]);
	},

};