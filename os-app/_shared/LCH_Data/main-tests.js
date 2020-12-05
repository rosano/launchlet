const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('LCH_DataModuleName', function test_LCH_DataModuleName() {

	it('returns string', function () {
		deepEqual(mod.LCH_DataModuleName(), 'launchlet');
	});

});
