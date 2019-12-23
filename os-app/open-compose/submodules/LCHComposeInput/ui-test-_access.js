const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeInput: '.LCHComposeInput',
	
	LCHComposeInputFieldDebug: '.LCHComposeInputFieldDebug',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeInput_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeInputItem: JSON.stringify({
				alfa: 'bravo',
			}),
			LCHComposeInputKey: 'alfa',
		});
	});

	it('shows LCHComposeInput', function () {
		browser.assert.elements(LCHComposeInput, 1);
	});

	it.skip('shows CodeMirror', function () {
		browser.assert.elements('.CodeMirror', 1);
	});

	it('shows LCHComposeInputFieldDebug', function () {
		browser.assert.elements(LCHComposeInputFieldDebug, 1);
	});

});
