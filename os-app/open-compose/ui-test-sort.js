const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Sort', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.pressButton('.LCHComposeMasterCreateButton');
	});

	before(function () {
		return browser.fill('.LCHComposeDetailFormNameField', 'alfa');
	});

	before(function () {
		return browser.pressButton('.LCHComposeMasterCreateButton');
	});

	before(function () {
		return browser.fill('.LCHComposeDetailFormNameField', 'bravo');
	});

	before(function () {
		return browser.pressButton('.LCHComposeMasterCreateButton');
	});

	before(function () {
		return browser.fill('.LCHComposeDetailFormNameField', 'charlie');
	});

	describe('update', function test_update () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3) .LCHComposeMasterListItem');
		});

		before(function () {
			return browser.fill('.LCHComposeDetailFormNameField', 'alfa2');
		});

		it('skips sort', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'charlie bravo alfa2');
		});

	});

	describe('deselect', function test_deselect () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('sorts list', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'alfa2 charlie bravo');
		});

	});

	describe('delete', function test_delete () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3) .LCHComposeMasterListItem');
		});

		before(function () {
			return browser.fill('.LCHComposeDetailFormNameField', 'bravo2');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(2) .LCHComposeMasterListItem');
		});

		before(async function () {
			return browser.OLSKConfirm(function () {
				return browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
			});
		});

		it('skips sort', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'alfa2 bravo2');
		});

	});

});
