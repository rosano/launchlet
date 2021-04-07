const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Catalog', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton('.LCHComposeCreateButton');
		});

		it('adds item', function () {
			browser.assert.elements('.LCHComposeListItem', 1);
		});
	
	});

	context('OLSKCatalogDispatchClick', function test_OLSKCatalogDispatchClick () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			browser.assert.elements('.LCHComposeDetail', 0);
		});

		before(function () {
			return browser.click('.LCHComposeListItem');
		});

		it('selects item', function () {
			browser.assert.elements('.LCHComposeDetail', 1);
		});
	
	});

	context('back', function test_back () {

		before(function () {
			return browser.pressButton('.LCHComposeDetailToolbarBackButton');
		});

		it('sets focus', function () {
			browser.assert.hasClass('.OLSKCatalogDetail', 'OLSKMobileViewInactive');
		});

	});

	context('discard', function test_discard () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.LCHComposeDetail', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
				});
			});

			it('removes item', function () {
				browser.assert.elements('.LCHComposeListItem', 0);
			});
		
		});
		
	});

	context('OLSKCatalogDispatchArrow', function test_OLSKCatalogDispatchArrow () {
		
		before(function () {
			return browser.pressButton('.LCHComposeCreateButton');
		});

		before(function () {
			return browser.pressButton('.LCHComposeCreateButton');
		});

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});
	
	});

});
