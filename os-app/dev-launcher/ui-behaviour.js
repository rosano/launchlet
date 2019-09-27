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

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.LCHLauncherBehaviour = global.LCHLauncherBehaviour || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); let moi = {}; Object.assign(exports, moi = {

	// INTERFACE

	InterfaceButtonDidClick() {
		setTimeout(function () {
			moi.CommandLaunch();
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
				optionsObject: Object.assign({}, {
					runMode: Launchlet[params.runMode || 'kRunModeCommit'],
					LCHOptionIncludePageRecipes: !!params.LCHOptionIncludePageRecipes || false,
				}),
			},
		});
	},

	// SETUP

	setupEverything() {
		if (params.LCHTestSkipAutomaticLaunch) {
			return;
		};
		
		moi.CommandLaunch()
	},

	// LIFECYCLE

	lifecyclePageWillLoad () {
		moi.setupEverything();
	},
}); })));
