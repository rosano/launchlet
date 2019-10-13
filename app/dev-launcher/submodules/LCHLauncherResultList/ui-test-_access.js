import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherResultList: '.LCHLauncherResultList',
	LCHLauncherResultListItem: '.LCHLauncherResultListItem',
	LCHLauncherResultListEmpty: '.LCHLauncherResultListEmpty',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherResultList_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('hides LCHLauncherResultList', function () {
		browser.assert.elements(LCHLauncherResultList, 0);
	});

	it('hides LCHLauncherResultListItem', function () {
		browser.assert.elements(LCHLauncherResultListItem, 0);
	});

	it('shows LCHLauncherResultListEmpty', function () {
	 	browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});

	it('shows TestLCHLauncherResultListEmptySlot', function () {
	 	browser.assert.elements('.TestLCHLauncherResultListEmptySlot', 1);
	});

	context('set single', function() {

		before(function () {
			return browser.pressButton('#LCHLauncherResultListTestSetTestItemsSingle');
		});

		it('shows LCHLauncherResultList', function () {
		 	browser.assert.elements(LCHLauncherResultList, 1);
		});

		it('shows LCHLauncherResultListItem', function () {
		 	browser.assert.elements(LCHLauncherResultListItem, 1);
		});

		it('hides LCHLauncherResultListEmpty', function () {
			browser.assert.elements(LCHLauncherResultListEmpty, 0);
		});

	});

	context('set multiple', function() {

		before(function () {
			return browser.pressButton('#LCHLauncherResultListTestSetTestItemsMultiple');
		});

		it('shows LCHLauncherResultListItem', function () {
			browser.assert.elements(LCHLauncherResultListItem, 3);
		});

		it('hides LCHLauncherResultListEmpty', function () {
			browser.assert.elements(LCHLauncherResultListEmpty, 0);
		});

	});

	context('set zero', function() {

		before(function () {
			return browser.pressButton('#LCHLauncherResultListTestSetTestItemsZero');
		});

		it('hides LCHLauncherResultList', function () {
			browser.assert.elements(LCHLauncherResultList, 0);
		});

		it('hides LCHLauncherResultListItem', function () {
			browser.assert.elements(LCHLauncherResultListItem, 0);
		});

		it('shows LCHLauncherResultListEmpty', function () {
		 	browser.assert.elements(LCHLauncherResultListEmpty, 1);
		});

	});

});
