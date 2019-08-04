import * as LCHCopyToClipboard from './LCHCopyToClipboard/main.js';

export const LCHLauncherStandardRecipes = function() {
	return [].concat.apply([], [LCHCopyToClipboard].map(function (e) {
		return Object.entries(e).map(function (e) {
			return {
				LCHRecipeSignature: e.shift(),
				LCHRecipeCallback: e.pop(),
			};
		});
	}));
};
