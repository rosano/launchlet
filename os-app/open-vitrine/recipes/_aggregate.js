import * as LCHVitrinePageColoursRandomize from './LCHVitrinePageColoursRandomize/main.js';
import * as LCHVitrinePageColoursRestore from './LCHVitrinePageColoursRestore/main.js';
import * as LCHVitrineCopyPageInfo from './LCHVitrineCopyPageInfo/main.js';
import * as LCHVitrineSendEmail from './LCHVitrineSendEmail/main.js';

import * as LCHVitrinePageLinksHighlightAdd from './LCHVitrinePageLinksHighlightAdd/main.js';
import * as LCHVitrinePageLinksHighlightRemove from './LCHVitrinePageLinksHighlightRemove/main.js';
import * as LCHVitrineMinimalistDateString from './LCHVitrineMinimalistDateString/main.js';

export const LCHVitrineRecipes = function() {
	return [].concat.apply([], [
		LCHVitrinePageColoursRandomize,
		LCHVitrinePageColoursRestore,
		LCHVitrineCopyPageInfo,
		LCHVitrineSendEmail,
		LCHVitrinePageLinksHighlightAdd,
		LCHVitrinePageLinksHighlightRemove,
		LCHVitrineMinimalistDateString,
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
