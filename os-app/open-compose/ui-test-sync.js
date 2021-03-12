const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Sync', function () {	

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
		return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
	});

	describe('ZDRSchemaDispatchSyncCreateDocument', function test_ZDRSchemaDispatchSyncCreateDocument () {

		before(function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		});

		it('adds item', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 2);
		});

		it('sorts list', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'FakeZDRSchemaDispatchSyncCreateDocument alfa');
		});

		context('selected', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(2) .LCHComposeMasterListItem');
			});

			before(function () {
				return browser.fill('.LCHComposeDetailFormNameField', 'alfa2');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
			});

			it('adds item', function () {
				browser.assert.elements('.LCHComposeMasterListItem', 3);
			});

			it('skips sort', function () {
				browser.assert.text('.LCHComposeMasterListItem', 'FakeZDRSchemaDispatchSyncCreateDocument FakeZDRSchemaDispatchSyncCreateDocument alfa2');
			});
		
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateDocument', function test_ZDRSchemaDispatchSyncUpdateDocument () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			browser.assert.text('.LCHComposeMasterListItem', 'FakeZDRSchemaDispatchSyncCreateDocument alfa2 FakeZDRSchemaDispatchSyncCreateDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		it('updates item', function () {
			browser.assert.text('.OLSKResultsListItem:nth-child(1) .LCHComposeMasterListItem', 'FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		it('sorts list', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'FakeZDRSchemaDispatchSyncUpdateDocument FakeZDRSchemaDispatchSyncCreateDocument alfa2');
		});

		context('selected different', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(1) .LCHComposeMasterListItem');
			});

			before(function () {
				return browser.fill('.LCHComposeDetailFormNameField', 'bravo');
			});

			before(function () {
				browser.assert.text('.LCHComposeMasterListItem', 'bravo FakeZDRSchemaDispatchSyncCreateDocument alfa2');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
			});

			it('updates item', function () {
				browser.assert.elements('.OLSKResultsListItem:nth-child(3) .LCHComposeMasterListItem', 'FakeZDRSchemaDispatchSyncUpdateDocument');
			});

			it('skips sort', function () {
				browser.assert.text('.LCHComposeMasterListItem', 'bravo FakeZDRSchemaDispatchSyncUpdateDocument alfa2');
			});
		
		});

		context('selected same', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(2) .LCHComposeMasterListItem');
			});

			before(function () {
				return browser.fill('.LCHComposeDetailFormNameField', 'FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
			});

			it('updates detail', function () {
				browser.assert.input('.LCHComposeDetailFormNameField', 'FakeZDRSchemaDispatchSyncUpdateDocument');
			});

		});

	});

	describe('ZDRSchemaDispatchSyncDeleteDocument', function test_ZDRSchemaDispatchSyncDeleteDocument () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3) .LCHComposeMasterListItem');
		});

		before(function () {
			return browser.fill('.LCHComposeDetailFormNameField', 'alfa3');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeEscapeWithoutSort');
		});

		before(function () {
			browser.assert.text('.LCHComposeMasterListItem', 'bravo FakeZDRSchemaDispatchSyncUpdateDocument alfa3');
		});

		before(function () {
			browser.assert.elements('.LCHComposeMasterListItem', 3);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
		});

		it('removes item', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 2);
		});

		it('skips sort', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'bravo alfa3');
		});

		context('selected different', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(2) .LCHComposeMasterListItem');
			});

			before(function () {
				return browser.fill('.LCHComposeDetailFormNameField', 'alfa4');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				browser.assert.elements('.LCHComposeMasterListItem', 3);
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
			});

			it('removes item', function () {
				browser.assert.elements('.LCHComposeMasterListItem', 2);
			});

			it('skips sort', function () {
				browser.assert.text('.LCHComposeMasterListItem', 'bravo alfa4');
			});
		
		});

		context('selected same', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(1) .LCHComposeMasterListItem');
			});

			before(function () {
				browser.assert.text('.LCHComposeMasterListItem', 'FakeZDRSchemaDispatchSyncCreateDocument bravo alfa4');
			});

			before(function () {
				browser.assert.elements('.LCHComposeMasterListItem', 3);
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
			});

			it('removes item', function () {
				browser.assert.elements('.LCHComposeMasterListItem', 2);
			});

			it('clear detail', function () {
				browser.assert.elements('.LCHComposeDetail', 0);
			});

			it('skips sort', function () {
				browser.assert.text('.LCHComposeMasterListItem', 'bravo alfa4');
			});
		
		});

	});

	describe('ZDRSchemaDispatchSyncConflictDocument', function test_ZDRSchemaDispatchSyncConflictDocument () {

		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		before(function () {
			return browser.fill('.LCHComposeDetailFormNameField', 'FakeZDRSchemaDispatchSyncConflictDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncConflictDocument');
		});

		it('selects local', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'FakeZDRSchemaDispatchSyncConflictDocument-local alfa4 bravo');
		});

	});

});
