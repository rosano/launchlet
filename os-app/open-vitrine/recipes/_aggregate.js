import * as LCHVitrineSendEmail from './LCHVitrineSendEmail/main.js';

export const LCHVitrineRecipes = function() {
	return [].concat.apply([], [
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
