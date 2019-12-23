const mod = {

	// SETUP

	SetupEverything() {
		Launchlet.LCHSingletonCreate([
			{
				LCHRecipeName: 'Alfa',
				LCHRecipeCallback () {
					alert('Alfa');
				},
			},
		]);
	},

	// LIFECYCLE

	LifecyclePageWillLoad () {
		mod.SetupEverything();
	},

};

window.LCHPackageBehaviour = mod;
