const _LCHLauncherRecipes = [];
window.LCHLauncherRecipesAdd = function (inputData) {
	_LCHLauncherRecipes.push(...inputData);
};

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.LCHLauncherBehaviour = global.LCHLauncherBehaviour || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); let moi = {}; Object.assign(exports, moi = {

	//# SETUP

	setupEverything() {
		moi.setupFormulas();
		moi.setupLauncher();
	},
	setupFormulas() {
		window.LCHPageFormulas = function () {
			return _LCHLauncherRecipes.concat([
				{
					LCHRecipeTitle: 'Hello',
					LCHRecipeCallback: function () {
						document.querySelector('textarea').value = 'Hello';
					},
				},
			]);
		};
	},
	setupLauncher() {
		let app = new Main({
			target: document.getElementById('LCHLauncherTarget'),
			props: {
				dataObjects: [
					'Alfa',
					'Bravo',
					'Charlie',
					'Delta',
					'Echo',
					'Foxtrot',
					'Golf',
					'Hotel',
					'Indigo',
					'Juliet',
					'Kilo',
					'Llama',
				].map(function (e) {
					return {
						LCHRecipeTitle: e,
						LCHRecipeCallback: function () {
							return document.querySelector('textarea').value = e;
						},
					};
				}).concat({
					LCHRecipeTitle: 'LCHLauncherAccessTestURLFilter',
					LCHRecipeCallback: function () {
						document.querySelector('input').value = 'xylophone';
					},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherAccessTestURLFilter',
				}).concat({
					LCHRecipeCallback: function () {
						document.querySelector('input').value = 'zebra';
					},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherAccessTestURLFilter',
					LCHRecipeIsAutomatic: true,
				}),
				completionHandler () {
					app.$destroy();
					app = null;
				},
				optionsObject: Object.assign({}, {
					runMode: Launchlet[(new URLSearchParams(window.location.search)).get('runMode') || 'kRunModeDefault'],
				}),
			},
		});
	},

	//# LIFECYCLE

	lifecyclePageWillLoad () {
		moi.setupEverything();
	},
}); })));
