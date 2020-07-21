const params = Object.fromEntries((new window.URLSearchParams(window.location.search)).entries());

const mod = {

	// INTERFACE

	InterfaceButtonDidClick() {
		setTimeout(function () {
			mod.ControlLaunch();
		});
	},

	// CONTROL

	ControlLaunch() {
		let app = new Main({
			target: document.getElementById('LCHLaunchxrTarget'),
			props: {
				// LRTOptions: {
				// 	LCHOptionRecipes: [],
				// 	LCHOptionMode: Launchlet[params.LCHOptionMode || 'LCHModeCommit'],
				// 	LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
				// 	LCHOptionIncludePageRecipes: !!params.LCHOptionIncludePageRecipes || false,
				// 	LCHOptionRunAutomaticRecipes: !!params.LCHOptionRunAutomaticRecipes || false,
				// },
				// LRTDidFinish () {
				// 	let span = document.createElement('span');
				// 	span.classList.add('TestLaunchxrDidFinish');
				// 	document.body.appendChild(span);

				// 	app.$destroy();
				// 	app = null;
				// },
			},
		});
	},

	// SETUP

	SetupEverything() {
		if (params.LCHTestSkipAutomaticLaunch) {
			return;
		}
		
		mod.ControlLaunch()
	},

	// LIFECYCLE

	LifecyclePageWillLoad () {
		mod.SetupEverything();
	},

};

window.LCHLaunchxrBehaviour = mod
