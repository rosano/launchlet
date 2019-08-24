import * as Bool from './PrimitiveBool/main.js';
import * as Date from './PrimitiveDate/main.js';
import * as ServiceSearchURLTemplate from './PrimitiveServiceSearchURLTemplate/main.js';
import * as String from './PrimitiveString/main.js';
import * as URL from './PrimitiveURL/main.js';

import * as Command from './TypeCommand/main.js';
import * as ServiceSearch from './TypeServiceSearch/main.js';

import * as LCHCopyToClipboard from './LCHCopyToClipboard/main.js';
import * as LCHDateLocalOffsetSubtracted from './LCHDateLocalOffsetSubtracted/main.js';
import * as LCHLargeText from './LCHLargeText/main.js';
import * as LCHRunCommand from './LCHRunCommand/main.js';
import * as LCHSearchAction from './LCHSearchAction/main.js';
import * as LCHServiceSearchWikipedia from './LCHServiceSearchWikipedia/main.js';
import * as LCHURLOpen from './LCHURLOpen/main.js';

export const LCHLauncherStandardRecipes = function() {
	return [].concat.apply([], [
		Bool,
		Date,
		ServiceSearchURLTemplate,
		String,
		URL,
		
		Command,
		ServiceSearch,
		
		LCHCopyToClipboard,
		LCHDateLocalOffsetSubtracted,
		LCHLargeText,
		LCHRunCommand,
		LCHSearchAction,
		LCHServiceSearchWikipedia,
		LCHURLOpen,
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
