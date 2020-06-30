const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	uSerial (inputData) {
		return inputData.reduce(function (coll, e) {
			return coll.then(e);
		}, Promise.resolve());
	},
	uLaunch (inputData) {
		return kTesting.uSerial([
			function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			},
			function () {
				return browser.fill('.LCHLauncherFilterInput', inputData);
			},
			function () {
				return browser.click('.LCHLauncherPipeItem');
			},
		]);
	},
};

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

	describe('OLSKChangeDelegateCreateDocument', function test_OLSKChangeDelegateCreateDocument () {

		before(function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDocument');
		});

		it('adds item', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 2);
		});

		it('sorts list', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'FakeOLSKChangeDelegateCreateDocument alfa');
		});

		context('selected', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(2) .LCHComposeMasterListItem');
			});

			before(function () {
				return browser.fill('.LCHComposeDetailFormNameField', 'alfa2');
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDocument');
			});

			it('adds item', function () {
				browser.assert.elements('.LCHComposeMasterListItem', 3);
			});

			it('skips sort', function () {
				browser.assert.text('.LCHComposeMasterListItem', 'FakeOLSKChangeDelegateCreateDocument FakeOLSKChangeDelegateCreateDocument alfa2');
			});
		
		});

	});

	describe('OLSKChangeDelegateUpdateDocument', function test_OLSKChangeDelegateUpdateDocument () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			browser.assert.text('.LCHComposeMasterListItem', 'FakeOLSKChangeDelegateCreateDocument alfa2 FakeOLSKChangeDelegateCreateDocument');
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateDocument');
		});

		it('updates item', function () {
			browser.assert.text('.OLSKResultsListItem:nth-child(1) .LCHComposeMasterListItem', 'FakeOLSKChangeDelegateUpdateDocument');
		});

		it('sorts list', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'FakeOLSKChangeDelegateUpdateDocument FakeOLSKChangeDelegateCreateDocument alfa2');
		});

		context('selected different', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(1) .LCHComposeMasterListItem');
			});

			before(function () {
				return browser.fill('.LCHComposeDetailFormNameField', 'bravo');
			});

			before(function () {
				browser.assert.text('.LCHComposeMasterListItem', 'bravo FakeOLSKChangeDelegateCreateDocument alfa2');
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateDocument');
			});

			it('updates item', function () {
				browser.assert.elements('.OLSKResultsListItem:nth-child(3) .LCHComposeMasterListItem', 'FakeOLSKChangeDelegateUpdateDocument');
			});

			it('skips sort', function () {
				browser.assert.text('.LCHComposeMasterListItem', 'bravo FakeOLSKChangeDelegateUpdateDocument alfa2');
			});
		
		});

		context('selected same', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(2) .LCHComposeMasterListItem');
			});

			before(function () {
				return browser.fill('.LCHComposeDetailFormNameField', 'FakeOLSKChangeDelegateCreateDocument');
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateDocument');
			});

			it('updates detail', function () {
				browser.assert.input('.LCHComposeDetailFormNameField', 'FakeOLSKChangeDelegateUpdateDocument');
			});

		});

	});

	describe('OLSKChangeDelegateDeleteDocument', function test_OLSKChangeDelegateDeleteDocument () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3) .LCHComposeMasterListItem');
		});

		before(function () {
			return browser.fill('.LCHComposeDetailFormNameField', 'alfa3');
		});

		before(function () {
			return kTesting.uLaunch('FakeEscapeWithoutSort');
		});

		before(function () {
			browser.assert.text('.LCHComposeMasterListItem', 'bravo FakeOLSKChangeDelegateUpdateDocument alfa3');
		});

		before(function () {
			browser.assert.elements('.LCHComposeMasterListItem', 3);
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteDocument');
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
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDocument');
			});

			before(function () {
				browser.assert.elements('.LCHComposeMasterListItem', 3);
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteDocument');
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
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDocument');
			});

			before(function () {
				return browser.click('.OLSKResultsListItem:nth-child(1) .LCHComposeMasterListItem');
			});

			before(function () {
				browser.assert.text('.LCHComposeMasterListItem', 'FakeOLSKChangeDelegateCreateDocument bravo alfa4');
			});

			before(function () {
				browser.assert.elements('.LCHComposeMasterListItem', 3);
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteDocument');
			});

			it('removes item', function () {
				browser.assert.elements('.LCHComposeMasterListItem', 2);
			});

			it('clear detail', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});

			it('skips sort', function () {
				browser.assert.text('.LCHComposeMasterListItem', 'bravo alfa4');
			});
		
		});

	});

	describe('OLSKChangeDelegateConflictDocument', function test_OLSKChangeDelegateConflictDocument () {

		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		before(function () {
			return browser.fill('.LCHComposeDetailFormNameField', 'FakeOLSKChangeDelegateConflictDocument');
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateConflictDocument');
		});

		it('selects local', function () {
			browser.assert.text('.LCHComposeMasterListItem', 'FakeOLSKChangeDelegateConflictDocument-local alfa4 bravo');
		});

	});

});
