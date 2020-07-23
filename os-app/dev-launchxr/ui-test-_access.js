const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const LCHLauncherLogic = require('./logic.js').default;

Object.entries({
	LCHLauncher: '.LCHLauncher',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncher_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHLauncher', function() {
		browser.assert.elements(LCHLauncher, 1)
	});

	it('shows LCHLauncherCommand', function() {
		browser.assert.elements('.LCHLauncherCommand', 1)
	});

	context('mode_command', function test_mode_command () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				TestLauncherInput: JSON.stringify({
					LCHOptionMode: LCHLauncherLogic.LCHLauncherModeCommand(),
				}),
			});
		});

		it('shows LCHLauncher', function() {
			browser.assert.elements(LCHLauncher, 1)
		});

		it('shows LCHLauncherCommand', function() {
			browser.assert.elements('.LCHLauncherCommand', 1)
		});

	});

	context('mode_pipe', function test_mode_pipe () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				TestLauncherInput: JSON.stringify({
					LCHOptionMode: LCHLauncherLogic.LCHLauncherModePipe(),
				}),
			});
		});

		it('shows LCHLauncher', function() {
			browser.assert.elements(LCHLauncher, 1)
		});

		it('shows LCHLauncherPipe', function() {
			browser.assert.elements('.LCHLauncherPipe', 1)
		});

	});

});
