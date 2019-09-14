import { OLSKLocalized } from '../_shared/common/global.js'

import { LCHVitrineRecipes } from './recipes/_aggregate.js'
const _LCHVitrineRecipes = LCHVitrineRecipes();

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
		Launchlet.instanceCreate([
			'LCHVitrineRandomizePageColours',
			'LCHVitrineRestorePageColours',
			'LCHVitrineCopyPageInfo',
			'LCHVitrineSendEmail',
		].map(function (e) {
			return Object.assign(_LCHVitrineRecipes.filter(function (item) {
				return item.LCHRecipeSignature === e;
			}).shift(), {
				LCHRecipeName: OLSKLocalized('LCHVitrineDemoRecipeNames')[e],
			});
		}));
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
			runMode: Launchlet.kRunModePreview,
		});
	},

	CommandDemoPipe() {
		Launchlet.instanceCreate([], {
			runMode: Launchlet.kRunModePipe,
		});
	},

};