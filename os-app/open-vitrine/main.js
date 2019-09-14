import { OLSKLocalized } from '../_shared/common/global.js'

import { LCHVitrineRecipes } from './recipes/_aggregate.js'

export const mod = {

	// INTERFACE

	InterfaceDemoButtonCommitDidClick() {
		setTimeout(function () {
			mod.CommandDemoCommit();
		})
	},

	// COMMAND

	CommandDemoCommit() {
		Launchlet.instanceCreate(LCHVitrineRecipes().filter(function (e) {
			return ['LCHVitrineSendEmail'].indexOf(e.LCHRecipeSignature) !== -1
		}).map(function (e) {
			return Object.assign(e, {
				LCHRecipeName: OLSKLocalized('LCHVitrineDemoRecipeNames')[e.LCHRecipeSignature],
			});
		}));
	},

};