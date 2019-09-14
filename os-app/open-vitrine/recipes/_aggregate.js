import * as LCHVitrineRandomizePageColours from './LCHVitrineRandomizePageColours/main.js';
import * as LCHVitrineRestorePageColours from './LCHVitrineRestorePageColours/main.js';
import * as LCHVitrineCopyPageInfo from './LCHVitrineCopyPageInfo/main.js';
import * as LCHVitrineSendEmail from './LCHVitrineSendEmail/main.js';

export const LCHVitrineRecipes = function() {
	return [].concat.apply([], [
		LCHVitrineRandomizePageColours,
		LCHVitrineRestorePageColours,
		LCHVitrineCopyPageInfo,
		LCHVitrineSendEmail,
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
