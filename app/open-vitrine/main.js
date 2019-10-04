import { OLSKLocalized } from '../_shared/common/global.js'

import { LCHVitrineRecipes } from './recipes/_aggregate.js'
const _LCHVitrineRecipes = LCHVitrineRecipes().map(function (e) {
	return Object.assign(e, {
		LCHRecipeName: OLSKLocalized('LCHVitrineDemoRecipeNames')[e.LCHRecipeSignature],
	});
});

export const mod = {

	// INTERFACE

	InterfaceDemoButtonCommitDidClick() {
		setTimeout(function () {
			mod.CommandDemoCommit();
		})
	},

	InterfaceDemoButtonPreviewDidClick() {
		setTimeout(function () {
			mod.CommandDemoPreview();
		})
	},

	InterfaceDemoButtonPipeDidClick() {
		setTimeout(function () {
			mod.CommandDemoPipe();
		})
	},

	// COMMAND

	CommandDemoCommit() {
		Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: _LCHVitrineRecipes,
			LCHOptionMode: Launchlet.LCHModeCommit,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	CommandDemoPreview() {
		Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: [].concat.apply([], document.querySelectorAll('h1,h2')).map(function (e) {
				return {
					LCHRecipeName: e.textContent,
					LCHRecipeCallback () {
						e.scrollIntoView();
					},
					_LCHRecipeIsSelected: e.getBoundingClientRect().top >= 0,
				};
			}),
			LCHOptionMode: Launchlet.LCHModePreview,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	CommandDemoPipe() {
		Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: _LCHVitrineRecipes,
			LCHOptionMode: Launchlet.LCHModePipe,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

};

window.LCHPageRecipes = _LCHVitrineRecipes.slice();
