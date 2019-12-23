import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeTools: '.LCHComposeTools',

	LCHComposeToolsPairButton: '.LCHComposeToolsPairButton',
	LCHComposeToolsPairStatusWaiting: '.LCHComposeToolsPairStatusWaiting',
	LCHComposeToolsPairStatusFailed: '.LCHComposeToolsPairStatusFailed',
	LCHComposeToolsPairStatusFailedError: '.LCHComposeToolsPairStatusFailedError',

	LCHComposeStorageWidget: '#LCHComposeStorageWidget',

	LCHComposeViewportFooter: '.LCHComposeViewportFooter',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHCompose_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHComposeMaster', function () {
		browser.assert.elements('.LCHComposeMaster', 1);
	});

	it('hides LCHComposeMasterListItem', function () {
		browser.assert.elements('.LCHComposeMasterListItem', 0);
	});

	it('shows LCHComposeDetail', function () {
		browser.assert.elements('.LCHComposeDetail', 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('shows LCHComposeTools', function () {
		browser.assert.elements(LCHComposeTools, 1);
	});

	it('shows LCHComposeTools', function () {
		browser.assert.elements('.LCHComposeTools', 1);
	});

	it('shows LCHComposeToolsPairButton', function () {
		browser.assert.elements(LCHComposeToolsPairButton, 1);
	});

	it('hides LCHComposeToolsPairStatusWaiting', function () {
		browser.assert.elements(LCHComposeToolsPairStatusWaiting, 0);
	});

	it('hides LCHComposeToolsPairStatusFailed', function () {
		browser.assert.elements(LCHComposeToolsPairStatusFailed, 0);
	});

	it('hides LCHComposeToolsPairStatusFailedError', function () {
		browser.assert.elements(LCHComposeToolsPairStatusFailedError, 0);
	});

	it('hides LCHComposePair', function () {
		browser.assert.elements('.LCHComposePair', 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows LCHComposeStorageWidget', function () {
		browser.assert.elements(LCHComposeStorageWidget, 1);
	});

	it('shows LCHComposeViewportFooter', function () {
		browser.assert.elements(LCHComposeViewportFooter, 1);
	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		it('shows LCHComposeMasterListItem', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});
	
	});

	context('back', function test_back () {
		
		before(function () {
			return browser.pressButton('.LCHComposeDetailToolbarBackButton');
		});

		// it('shows OLSKDetailPlaceholder', function () {
		// 	browser.assert.elements('.OLSKDetailPlaceholder', 1);
		// });
	
	});

	context('click_LCHComposeMasterListItem', function test_click_LCHComposeMasterListItem () {
		
		before(function () {
			return browser.click('.LCHComposeMasterListItem');
		});

		it('shows LCHComposeMasterListItem', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
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

			it('hides OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
				});
			});

			it('hides LCHComposeMasterListItem', function () {
				browser.assert.elements('.LCHComposeMasterListItem', 0);
			});

			it('shows OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});
		
		});
		
	});

	context('LCHComposeToolsPairButton', function () {
		
		context('click', function () {
			
			before(function () {
				return browser.pressButton('.LCHComposeToolsPairButton');
			});

			it('hides LCHComposeToolsPairButton', function () {
				browser.assert.elements(LCHComposeToolsPairButton, 0);
			});

			it('shows LCHComposeToolsPairStatusWaiting', function () {
				browser.assert.elements(LCHComposeToolsPairStatusWaiting, 1);
			});

			it('shows LCHComposePair', function () {
				browser.assert.elements('.LCHComposePair', 1);
			});
		
		});

		context('TestLCHComposeToolsPairIsVisible', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					TestLCHComposeToolsPairIsVisible: true,
				});
			});

			it('hides LCHComposeToolsPairButton', function () {
				browser.assert.elements(LCHComposeToolsPairButton, 0);
			});

			it('shows LCHComposeToolsPairStatusWaiting', function () {
				browser.assert.elements(LCHComposeToolsPairStatusWaiting, 1);
			});

			it('shows LCHComposePair', function () {
				browser.assert.elements('.LCHComposePair', 1);
			});
		
		});

		context('TestLCHComposePairDidFail', function () {
			
			before(function () {
				browser.evaluate(`window.postMessage({
					LBXResponseHash: 'alfa',
				}, window.location.href)`);
			});
			
			it('hides LCHComposeToolsPairStatusWaiting', function () {
				browser.assert.elements(LCHComposeToolsPairStatusWaiting, 0);
			});

			it('shows LCHComposeToolsPairStatusFailed', function () {
				browser.assert.elements(LCHComposeToolsPairStatusFailed, 1);
			});

			it('shows LCHComposeToolsPairStatusFailedError', function () {
				browser.assert.elements(LCHComposeToolsPairStatusFailedError, 1);
			});
		
		});
	
	});

});
