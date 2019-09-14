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

	// COMMAND

	CommandDemoCommit() {
		Launchlet.instanceCreate([
			'LCHVitrineRandomizePageColours',
			'LCHVitrineSendEmail',
		].map(function (e) {
			return Object.assign(_LCHVitrineRecipes.filter(function (item) {
				return item.LCHRecipeSignature === e;
			}).shift(), {
				LCHRecipeName: OLSKLocalized('LCHVitrineDemoRecipeNames')[e],
			});
		}));
	},

};