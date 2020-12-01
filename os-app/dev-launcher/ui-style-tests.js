const inputData = require('fs').readFileSync(require('path').join(__dirname, '__compiled/ui-style.css'), 'utf8');

describe('LCHLauncherStyle', function test_LCHLauncherStyle() {

	it('contains normalize', function() {
		browser.assert.deepEqual(inputData.match(/\{(.*00%)\}/)[1], 'line-height:1.15;-webkit-text-size-adjust:100%');
	});

	it('prefixes normalize', function() {
		browser.assert.deepEqual(typeof inputData.match(/\.Container\.svelte-\w+\{line-height:1\.15/).pop(), 'string');
	});

});
