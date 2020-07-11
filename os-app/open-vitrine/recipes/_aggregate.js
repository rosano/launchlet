import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import * as LCHVitrinePageColoursRandomize from './LCHVitrinePageColoursRandomize/main.js';
import * as LCHVitrinePageColoursRestore from './LCHVitrinePageColoursRestore/main.js';
import * as LCHVitrineSendEmail from './LCHVitrineSendEmail/main.js';

import * as LCHVitrinePageLinksHighlightAdd from './LCHVitrinePageLinksHighlightAdd/main.js';
import * as LCHVitrinePageLinksHighlightRemove from './LCHVitrinePageLinksHighlightRemove/main.js';
import * as LCHVitrineMinimalistDateString from './LCHVitrineMinimalistDateString/main.js';

export const mod = {

	LCHVitrineRecipes () {
		return [].concat.apply([], [
			LCHVitrinePageColoursRandomize,
			LCHVitrinePageColoursRestore,
			{
				LCHVitrineCopyPageInfoRecipe: mod.LCHVitrineCopyPageInfoRecipe,
			},
			LCHVitrineSendEmail,
			LCHVitrinePageLinksHighlightAdd,
			LCHVitrinePageLinksHighlightRemove,
			LCHVitrineMinimalistDateString,
		].map(function (e) {
			return Object.entries(e).filter(function (e) {
				return e.shift().includes('Recipe');
			}).map(function (e) {
				return e.pop()();
			}).map(function (e) {
				return e;
			});
		}));
	},

	LCHVitrineCopyPageInfo () {
		window.alert(OLSKLocalized('LCHVitrineCopyPageInfoAlertText'));

		return this.api.LCHCopyToClipboard(`${document.title} ${location.href}`);
	},

	LCHVitrineCopyPageInfoRecipe () {
		return {
			LCHRecipeCallback: mod.LCHVitrineCopyPageInfo,
			LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
		};
	},

};

export default mod;
