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
					LRTOptionRecipes: StubRecipesParse(params.StubRecipes) || [],
					LRTOptionMode: Launchlet[params.LRTOptionMode || 'LRTModeCommit'],
					LRTOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
					LRTOptionIncludePageRecipes: !!params.LRTOptionIncludePageRecipes || false,
					LRTOptionRunTasks: !!params.LRTOptionRunTasks || false,
					LRTOptionCompletionHandler () {
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
