
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
				LCHLauncherRecipes: StubRecipesParse(new URLSearchParams(window.location.search).get('StubRecipes')) || [],
				completionHandler () {
					let span = document.createElement('span');
					span.id = 'LCHLauncherTestDidFinish';
					document.querySelector('span').appendChild(span);

					app.$destroy();
					app = null;
				},
				optionsObject: Object.assign({}, {
					runMode: Launchlet[(new URLSearchParams(window.location.search)).get('runMode') || 'kRunModeCommit'],
					LCHOptionIncludePageRecipes: !!(new URLSearchParams(window.location.search)).get('LCHOptionIncludePageRecipes') || false,
				}),
			},
		});
	},

	// SETUP

	setupEverything() {
		moi.SetupPageRecipes();
		moi.CommandLaunch()
	},
	SetupPageRecipes() {
		window.LCHPageRecipes = _LCHLauncherRecipes.concat([
			{
				LCHRecipeName: 'Hello',
				LCHRecipeCallback: function () {
					document.querySelector('textarea').value = 'Hello';
				},
			},
			{
				LCHRecipeCallback: function () {
					document.querySelector('input').value = 'AutomaticRunningOfPageRecipes';
				},
				LCHRecipeURLFilter: 'loc',
				LCHRecipeIsAutomatic: true,
			}
		]);
	},

	// LIFECYCLE

	lifecyclePageWillLoad () {
		moi.setupEverything();
	},
}); })));
