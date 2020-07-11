import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import * as LCHVitrineSendEmail from './LCHVitrineSendEmail/main.js';

import * as LCHVitrinePageLinksHighlightAdd from './LCHVitrinePageLinksHighlightAdd/main.js';
import * as LCHVitrinePageLinksHighlightRemove from './LCHVitrinePageLinksHighlightRemove/main.js';

const mod = {

	LCHVitrineRecipes () {
		return [].concat.apply([], [
			{
				LCHVitrinePageColoursRandomizeRecipe: mod.LCHVitrinePageColoursRandomizeRecipe,
			},
			{
				LCHVitrinePageColoursRestoreRecipe: mod.LCHVitrinePageColoursRestoreRecipe,
			},
			{
				LCHVitrineCopyPageInfoRecipe: mod.LCHVitrineCopyPageInfoRecipe,
			},
			LCHVitrineSendEmail,
			LCHVitrinePageLinksHighlightAdd,
			LCHVitrinePageLinksHighlightRemove,
			{
				LCHVitrineMinimalistDateStringRecipe: mod.LCHVitrineMinimalistDateStringRecipe,
			},
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

	LCHVitrinePageColoursRandomizeCallback () {
		let element = document.querySelector('style.LCHVitrinePageColoursRandomize')
		
		if (!element) {
			document.body.appendChild(element = document.createElement('style')).classList.add('LCHVitrinePageColoursRandomize')
		};

		let random = Math.random()

		const match = element.innerHTML.match(/LCHCommonBackground: hsl\(0\, 0\%\, (.*)\%/)
		if (match) {
			const previous = parseFloat(match.pop()) / 100;

			while (Math.abs(random - previous) < 0.1 || (random >= 0.4 && random <= 0.6)) {
				random = Math.random();
			}
		};

		element.innerHTML = `
		body {
		--LCHCommonBackground: hsl(0, 0%, ${ random * 100 }%);
		--LCHCommonForeground: hsl(0, 0%, ${ 100.0 - random * 100 }%);
		}
	`
	},

	LCHVitrinePageColoursRandomizeRecipe () {
		return {
			LCHRecipeCallback: mod.LCHVitrinePageColoursRandomizeCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
		};
	},

	LCHVitrinePageColoursRestoreIsHidden () {
		return !document.querySelector('style.LCHVitrinePageColoursRandomize');
	},

	LCHVitrinePageColoursRestoreCallback () {
		document.querySelector('style.LCHVitrinePageColoursRandomize').remove()
	},

	LCHVitrinePageColoursRestoreRecipe () {
		return {
			LCHRecipeCallback: mod.LCHVitrinePageColoursRestoreCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRestore',
			LCHRecipeIsExcluded: mod.LCHVitrinePageColoursRestoreIsHidden,
		};
	},

	LCHVitrineCopyPageInfoCallback () {
		window.alert(OLSKLocalized('LCHVitrineCopyPageInfoAlertText'));

		return this.api.LCHCopyToClipboard(`${document.title} ${location.href}`);
	},

	LCHVitrineCopyPageInfoRecipe () {
		return {
			LCHRecipeCallback: mod.LCHVitrineCopyPageInfoCallback,
			LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
		};
	},

	LCHVitrineMinimalistDateStringCallback () {
		return (new Date()).toJSON().slice(0, 10).replace(/-/g, '.');
	},

	LCHVitrineMinimalistDateStringRecipe () {
		return {
			LCHRecipeCallback: mod.LCHVitrineMinimalistDateStringCallback,
			LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
			LCHRecipeOutputType: 'String',
		};
	},

};

export default mod;
