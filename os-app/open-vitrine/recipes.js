import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

const mod = {

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

	LCHVitrineSendEmailCallback () {
		const url = 'mailto:';

		if (OLSK_TESTING_BEHAVIOUR()) {
			return window.alert(url)
		};

		window.location.href = url;
	},

	LCHVitrineSendEmailRecipe () {
		return {
			LCHRecipeCallback: mod.LCHVitrineSendEmailCallback,
			LCHRecipeSignature: 'LCHVitrineSendEmail',
		};
	},

	LCHVitrinePageLinksHighlightAddIsHidden () {
		return document.querySelector('style.LCHVitrinePageLinksHighlightAdd');
	},

	LCHVitrinePageLinksHighlightAddCallback () {
		let element = document.body.appendChild(document.createElement('style'))
		
		element.classList.add('LCHVitrinePageLinksHighlightAdd')
		element.innerHTML = `a { background: yellow !important; }`
	},

	LCHVitrinePageLinksHighlightAddRecipe () {
		return {
			LCHRecipeCallback: mod.LCHVitrinePageLinksHighlightAddCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightAdd',
			LCHRecipeIsExcluded: mod.LCHVitrinePageLinksHighlightAddIsHidden,
		};
	},

	LCHVitrinePageLinksHighlightRemoveIsHidden () {
		return !document.querySelector('style.LCHVitrinePageLinksHighlightAdd');
	},

	LCHVitrinePageLinksHighlightRemoveCallback () {
		document.querySelector('style.LCHVitrinePageLinksHighlightAdd').remove()
	},

	LCHVitrinePageLinksHighlightRemoveRecipe () {
		return {
			LCHRecipeCallback: mod.LCHVitrinePageLinksHighlightRemoveCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightRemove',
			LCHRecipeIsExcluded: mod.LCHVitrinePageLinksHighlightRemoveIsHidden,
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
