import { deepEqual } from 'assert';

describe('LCHLauncherStyle', function testLCHLauncherStyle() {

	it('contains normalize', function() {
		deepEqual(require('fs').readFileSync(require('path').join(__dirname, '__compiled/ui-style.css'), 'utf8').match(/\{(.*00%)\}/)[1], 'line-height:1.15;-webkit-text-size-adjust:100%');
	});

});
