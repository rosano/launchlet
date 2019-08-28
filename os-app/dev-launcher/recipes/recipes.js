import * as Bool from './primitives/Bool/main.js';
import * as Date from './primitives/Date/main.js';
import * as ServiceSearchURLTemplate from './primitives/ServiceSearchURLTemplate/main.js';
import * as String from './primitives/String/main.js';
import * as URL from './primitives/URL/main.js';

import * as Command from './TypeCommand/main.js';
import * as ServiceSearch from './TypeServiceSearch/main.js';

import * as LCHCopyToClipboard from './actions/LCHCopyToClipboard/main.js';
import * as LCHDateLocalOffsetSubtracted from './functions/LCHDateLocalOffsetSubtracted/main.js';
import * as LCHLargeText from './LCHLargeText/main.js';
import * as LCHRunCommand from './LCHRunCommand/main.js';
import * as LCHSearchAction from './LCHSearchAction/main.js';
import * as LCHServiceSearchWikipedia from './LCHServiceSearchWikipedia/main.js';
import * as LCHURLOpen from './LCHURLOpen/main.js';

import * as SubjectContainer from './types/SubjectContainer/main.js';

import * as LCHActiveDocumentLinkElements from './subjects/LCHActiveDocumentLinkElements/main.js';

import * as LCHSubjectContainerShowContents from './actions/LCHSubjectContainerShowContents/main.js';

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

		SubjectContainer,

		LCHActiveDocumentLinkElements,

		LCHSubjectContainerShowContents,
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
