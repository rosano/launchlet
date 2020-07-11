import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import LCHVitrineRecipes from './recipes.js'

const _LCHVitrineRecipes = Object.entries(LCHVitrineRecipes).filter(function (e) {
	return e.shift().includes('Recipe');
}).map(function (e) {
	const item = e.pop()();
	return Object.assign(item, {
		LCHRecipeName: OLSKLocalized('LCHVitrineDemoRecipeNames')[item.LCHRecipeSignature],
	});
});

const mod = {

	// INTERFACE

	InterfaceDemoButtonCommitDidClick() {
		mod.ControlDemoCommit();
	},

	InterfaceDemoButtonPreviewDidClick() {
		mod.ControlDemoPreview();
	},

	InterfaceDemoButtonPipeDidClick() {
		mod.ControlDemoPipe();
	},

	// CONTROL

	ControlDemoCommit() {
		Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: _LCHVitrineRecipes,
			LCHOptionMode: Launchlet.LCHModeCommit,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	ControlDemoPreview() {
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

	ControlDemoPipe() {
		Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: _LCHVitrineRecipes,
			LCHOptionMode: Launchlet.LCHModePipe,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

};

window.LCHPageRecipes = _LCHVitrineRecipes.slice();

(function() {
	const proxyObjects = window.LCHPageRecipes.map(function (e) {
		return {
			LCHRecipeProxyName: e.LCHRecipeName,
			LCHRecipeProxySignature: e.LCHRecipeSignature,
		};
	});

	const signaturesMap = window.LCHPageRecipes.reduce(function (coll, item) {
		coll[item.LCHRecipeSignature] = item;

		return coll;
	}, {});

	window.addEventListener('message', function (event) {
	  if (event.source !== window) {
	  	return;
	  }

	  if (event.data === 'LCHPageRecipes') {
	  	return event.source.postMessage(proxyObjects, event.origin);
	  };

	  if (signaturesMap[event.data]) {
	  	return signaturesMap[event.data].LCHRecipeCallback();
	  };
	}, false);
})();

export default mod;
