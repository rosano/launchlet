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
					LCHRecipeName: 'Hello',
					LCHRecipeCallback: function () {
						document.querySelector('textarea').value = 'Hello';
					},
				},
				{
					LCHRecipeCallback: function () {
						document.querySelector('input').value = 'LCHPageFormulas';
					},
					LCHRecipeURLFilter: 'loc',
					LCHRecipeIsAutomatic: true,
				}
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
						LCHRecipeName: e,
						LCHRecipeCallback: function () {
							return document.querySelector('textarea').value = e;
						},
					};
				}).concat([{
					LCHRecipeName: 'LCHLauncherTestURLFilter',
					LCHRecipeCallback: function () {
						document.querySelector('input').value = 'xylophone';
					},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestURLFilter',
				}, {
					LCHRecipeCallback: function () {
						document.querySelector('input').value = 'zebra';
					},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestURLFilter',
					LCHRecipeIsAutomatic: true,
				}, {
					LCHRecipeName: 'LCHLauncherTestStyle',
					LCHRecipeCallback: function () {},
					LCHRecipeStyle: 'body { background: red; }',
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestStyle',
				}, {
					LCHRecipeName: 'LCHLauncherTestLongStringAlfaBravoCharlieDeltaEchoFoxtrotGolfHotel',
					LCHRecipeCallback: function () {},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestLongString',
				}, {
					LCHRecipeName: 'LCHLauncherTestConvertTypeServiceSearch',
					LCHRecipeCallback: function (alfa) {},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestConvertTypeServiceSearch',
					LCHRecipeOutputType: 'URL',
				}]),
				completionHandler () {
					let span = document.createElement('span');
					span.id = 'LCHLauncherTestDidFinish';
					document.querySelector('span').appendChild(span);

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
