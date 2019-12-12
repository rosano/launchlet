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
		moi.SetupEverything();
	},

};

window.LCHPackageBehaviour = mod;
