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
		Launchlet.instanceCreate(_LCHVitrineRecipes, {
			runMode: Launchlet.kRunModeCommit,
			languageCode: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	CommandDemoPreview() {
		Launchlet.instanceCreate([].concat.apply([], document.querySelectorAll('h1,h2')).map(function (e) {
			return {
				LCHRecipeName: e.textContent,
				LCHRecipeCallback () {
					e.scrollIntoView();
				},
			};
		}), {
			runMode: Launchlet.LPKModePreview,
			languageCode: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	CommandDemoPipe() {
		Launchlet.instanceCreate(_LCHVitrineRecipes, {
			runMode: Launchlet.LPKModePipe,
			languageCode: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

};

window.LCHPageRecipes = _LCHVitrineRecipes.slice();
