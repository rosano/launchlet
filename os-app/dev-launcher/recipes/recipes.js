import * as Bool from './TypeBool/main.js';
import * as Date from './TypeDate/main.js';
import * as ServiceSearch from './TypeServiceSearch/main.js';
import * as String from './TypeString/main.js';
import * as URL from './TypeURL/main.js';

import * as Command from './TypeCommand/main.js';

import * as LCHCopyToClipboard from './LCHCopyToClipboard/main.js';
import * as LCHDateLocalOffsetSubtracted from './LCHDateLocalOffsetSubtracted/main.js';
import * as LCHLargeType from './LCHLargeType/main.js';
import * as LCHRunCommand from './LCHRunCommand/main.js';
import * as LCHSearchWith from './LCHSearchWith/main.js';
import * as LCHServiceSearchWikipedia from './LCHServiceSearchWikipedia/main.js';

export const LCHLauncherStandardRecipes = function() {
	return [].concat.apply([], [
		Bool,
		Date,
		ServiceSearch,
		String,
		URL,
		
		Command,
		
		LCHCopyToClipboard,
		LCHDateLocalOffsetSubtracted,
		LCHLargeType,
		LCHRunCommand,
		LCHSearchWith,
		LCHServiceSearchWikipedia,
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
