const _LCHLauncherRecipes = [];
window.LCHLauncherRecipesAdd = function (inputData) {
	_LCHLauncherRecipes.push(...inputData);
};

function StubRecipesParse(inputData) {
	if (!inputData) {
		return null;
	};

	return JSON.parse(inputData).map(function (e) {
		return Object.assign(e, {
			LCHRecipeCallback: eval(e.LCHRecipeCallback),
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
				LCHLauncherRecipes: StubRecipesParse(new URLSearchParams(window.location.search).get('StubRecipes')) || [
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
					LCHRecipeURLFilter: 'LCHLauncherTestURLFilter',
				}, {
					LCHRecipeCallback: function () {
						document.querySelector('input').value = 'zebra';
					},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestURLFilter',
					LCHRecipeIsAutomatic: true,
				}, {
					LCHRecipeName: 'LCHLauncherTestIsHidden1',
					LCHRecipeCallback: function () {},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestIsHidden',
				}, {
					LCHRecipeName: 'LCHLauncherTestIsHidden2',
					LCHRecipeCallback: function () {},
					LCHRecipeIsHidden: function () {
						return document.querySelector('input').value !== 'LCHLauncherTestIsHidden1';
					},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestIsHidden',
				}, {
					LCHRecipeName: 'LCHLauncherTestLongStringAlfaBravoCharlieDeltaEchoFoxtrotGolfHotel',
					LCHRecipeCallback: function () {},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestLongString',
				}, {
					LCHRecipeName: 'LCHLauncherTestConvertTypeServiceSearch',
					LCHRecipeCallback: function (alfa) {},
					LCHRecipeURLFilter: 'loc.tests/launcher?LCHLauncherTestConvertTypeServiceSearch',
					LCHRecipeOutputType: 'URL',
				}, {
					LCHRecipeName: 'string subject',
					LCHRecipeCallback: function () {
						return 'hello';
					},
					LCHRecipeOutputType: 'String',
				}, {
					LCHRecipeName: 'LCHLauncherTestInvalid',
				}]),
				completionHandler () {
					let span = document.createElement('span');
					span.id = 'LCHLauncherTestDidFinish';
					document.querySelector('span').appendChild(span);

					app.$destroy();
					app = null;
				},
				optionsObject: Object.assign({}, {
					runMode: Launchlet[(new URLSearchParams(window.location.search)).get('runMode') || 'kRunModeCommit'],
					LCHOptionIncludePageRecipes: Launchlet[(new URLSearchParams(window.location.search)).get('LCHOptionIncludePageRecipes') || false],
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
