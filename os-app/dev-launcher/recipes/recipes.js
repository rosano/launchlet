import * as Bool from './Bool/main.js';
import * as String from './String/main.js';
import * as URL from './URL/main.js';

import * as LCHCopyToClipboard from './LCHCopyToClipboard/main.js';

export const LCHLauncherStandardRecipes = function() {
	return [].concat.apply([], [
		Bool,
		String,
		URL,
		
		LCHCopyToClipboard,
	].map(function (e) {
		return Object.entries(e).filter(function (e) {
			return e.shift().includes('Recipe');
		}).map(function (e) {
			return e.pop()();
		}).map(function (e) {
			return e;
		});
	}));
};
