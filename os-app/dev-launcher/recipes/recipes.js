import * as Bool from './TypeBool/main.js';
import * as String from './TypeString/main.js';
import * as URL from './TypeURL/main.js';
import * as Command from './TypeCommand/main.js';

import * as LCHCopyToClipboard from './LCHCopyToClipboard/main.js';
import * as LCHLargeType from './LCHLargeType/main.js';
import * as LCHRunCommand from './LCHRunCommand/main.js';

export const LCHLauncherStandardRecipes = function() {
	return [].concat.apply([], [
		Bool,
		String,
		URL,
		Command,
		
		LCHCopyToClipboard,
		LCHLargeType,
		LCHRunCommand,
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
