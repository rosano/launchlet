import * as Bool from './primitives/Bool/main.js';
import * as Date from './primitives/Date/main.js';
import * as DOMElement from './primitives/LCHPrimitiveDOMElement/main.js';
import * as ServiceSearchURLTemplate from './primitives/ServiceSearchURLTemplate/main.js';
import * as String from './primitives/String/main.js';
import * as URL from './primitives/URL/main.js';

import * as Command from './types/LCHTypeCommand/main.js';
import * as ServiceSearch from './types/ServiceSearch/main.js';
import * as SubjectContainer from './types/SubjectContainer/main.js';

import * as LCHDateLocalOffsetSubtracted from './functions/LCHDateLocalOffsetSubtracted/main.js';

import * as LCHActiveDocumentFocusElements from './subjects/LCHActiveDocumentFocusElements/main.js';

import * as LCHCopyToClipboard from './actions/LCHCopyToClipboard/main.js';
import * as LCHDOMElementFocus from './actions/LCHDOMElementFocus/main.js';
import * as LCHLargeText from './actions/LCHLargeText/main.js';
import * as LCHRunCommand from './actions/LCHRunCommand/main.js';
import * as LCHSearchAction from './actions/LCHSearchAction/main.js';
import * as LCHServiceSearchWikipedia from './actions/LCHServiceSearchWikipedia/main.js';
import * as LCHSubjectContainerShowContents from './actions/LCHSubjectContainerShowContents/main.js';
import * as LCHURLOpen from './actions/LCHURLOpen/main.js';

export const LCHLauncherStandardRecipes = function() {
	return [].concat.apply([], [
		Bool,
		Date,
		DOMElement,
		ServiceSearchURLTemplate,
		String,
		URL,
		
		Command,
		ServiceSearch,
		SubjectContainer,
		
		LCHActiveDocumentFocusElements,

		LCHDateLocalOffsetSubtracted,

		LCHCopyToClipboard,
		LCHDOMElementFocus,
		LCHLargeText,
		LCHRunCommand,
		LCHSearchAction,
		LCHServiceSearchWikipedia,
		LCHSubjectContainerShowContents,
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
