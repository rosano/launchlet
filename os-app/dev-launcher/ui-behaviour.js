const params = Object.fromEntries((new window.URLSearchParams(window.location.search)).entries());

function StubRecipesParse(inputData) {
	if (!inputData) {
		return null;
	};

	return JSON.parse(inputData).map(function (e) {
		return Object.assign(e, {
			LCHRecipeCallback: eval(e.LCHRecipeCallback),
			LCHRecipeIsHidden: eval(e.LCHRecipeIsHidden),
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
				LCHLauncherRecipes: StubRecipesParse(params.StubRecipes) || [],
				completionHandler () {
					let span = document.createElement('span');
					span.classList.add('TestLauncherDidFinish');
					document.body.appendChild(span);

					app.$destroy();
					app = null;
				},
				optionsObject: {
					LRTOptionMode: Launchlet[params.LRTOptionMode || 'LPKModeCommit'],
					languageCode: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
					LCHOptionIncludePageRecipes: !!params.LCHOptionIncludePageRecipes || false,
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
