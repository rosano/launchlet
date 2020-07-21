const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const LCHLaunchxrLogic = require('./logic.js').default;

Object.entries({
	LCHLaunchxr: '.LCHLaunchxr',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLaunchxr_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHLaunchxr', function() {
		browser.assert.elements(LCHLaunchxr, 1)
	});

	it('shows LCHLaunchxrCommand', function() {
		browser.assert.elements('.LCHLaunchxrCommand', 1)
	});

	context('mode_command', function test_mode_command () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				TestLaunchxrInput: JSON.stringify({
					LCHOptionMode: LCHLaunchxrLogic.LCHLaunchxrModeCommand(),
				}),
			});
		});

		it('shows LCHLaunchxr', function() {
			browser.assert.elements(LCHLaunchxr, 1)
		});

		it('shows LCHLaunchxrCommand', function() {
			browser.assert.elements('.LCHLaunchxrCommand', 1)
		});

	});

	context('mode_pipe', function test_mode_pipe () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				TestLaunchxrInput: JSON.stringify({
					LCHOptionMode: LCHLaunchxrLogic.LCHLaunchxrModePipe(),
				}),
			});
		});

		it('shows LCHLaunchxr', function() {
			browser.assert.elements(LCHLaunchxr, 1)
		});

		it('shows LCHLaunchxrPipe', function() {
			browser.assert.elements('.LCHLaunchxrPipe', 1)
		});

	});

});
