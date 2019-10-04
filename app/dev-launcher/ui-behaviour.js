const params = Object.fromEntries((new window.URLSearchParams(window.location.search)).entries());

function StubRecipesParse(inputData) {
	if (!inputData) {
		return null;
	};

	return JSON.parse(inputData).map(function (e) {
		return Object.assign(e, {
			LCHRecipeCallback: eval(e.LCHRecipeCallback),
			LCHRecipeIsExcluded: eval(e.LCHRecipeIsExcluded),
		});
	});
}

const mod = {

	// INTERFACE

	InterfaceButtonDidClick() {
		setTimeout(function () {
			mod.CommandLaunch();
		})
	},

	// COMMAND

	CommandLaunch() {
		let app = new Main({
			target: document.getElementById('LCHLauncherTarget'),
			props: {
				LRTOptions: {
					LCHOptionRecipes: StubRecipesParse(params.StubRecipes) || [],
					LCHOptionMode: Launchlet[params.LCHOptionMode || 'LCHModeCommit'],
					LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
					LCHOptionIncludePageRecipes: !!params.LCHOptionIncludePageRecipes || false,
					LCHOptionRunTasks: !!params.LCHOptionRunTasks || false,
					LCHOptionCompletionHandler () {
						let span = document.createElement('span');
						span.classList.add('TestLauncherDidFinish');
						document.body.appendChild(span);

						app.$destroy();
						app = null;
					},
				},
			},
		});
	},

	// SETUP

	SetupEverything() {
		if (params.LCHTestSkipAutomaticLaunch) {
			return;
		};
		
		mod.CommandLaunch()
	},

	// LIFECYCLE

	LifecyclePageWillLoad () {
		mod.SetupEverything();
	},
};

window.LCHLauncherBehaviour = mod
