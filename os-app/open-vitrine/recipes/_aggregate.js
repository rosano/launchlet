import * as LCHVitrineSendEmail from './LCHVitrineSendEmail/main.js';
import * as LCHVitrineRandomizePageColours from './LCHVitrineRandomizePageColours/main.js';
import * as LCHVitrineRestorePageColours from './LCHVitrineRestorePageColours/main.js';

export const LCHVitrineRecipes = function() {
	return [].concat.apply([], [
		LCHVitrineSendEmail,
		LCHVitrineRandomizePageColours,
		LCHVitrineRestorePageColours,
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
