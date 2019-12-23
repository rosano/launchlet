const mod = {

	// SETUP

	SetupEverything() {
		Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: [
				{
					LCHRecipeName: 'Alfa',
					LCHRecipeCallback () {
						alert('Alfa');
					},
				},
			],
		});
	},

	// LIFECYCLE

	LifecyclePageWillLoad () {
		mod.SetupEverything();
	},

};

window.LCHPackageBehaviour = mod;
