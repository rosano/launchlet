describe('LCHPackageStyle', function test_LCHPackageStyle() {

	it('contains launcher style', function() {
		browser.assert.deepEqual(require('fs').readFileSync(require('path').join(__dirname, '__compiled/launchlet.css'), 'utf8').slice(0, 100), require('fs').readFileSync(require('path').join(__dirname, '../dev-launcher/__compiled/ui-style.css'), 'utf8').slice(0, 100));
	});

});
