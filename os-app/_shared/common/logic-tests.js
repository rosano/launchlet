import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LCHSharedDonateLinkGuard', function testLCHSharedDonateLinkGuard() {

	const StubEnvValid = function () {
		return {
			LCH_SHARED_DONATE_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHSharedDonateLinkGuard(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns error if no LCH_SHARED_DONATE_URL', function () {
		deepEqual(mainModule.LCHSharedDonateLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_DONATE_URL: null,
		})), new Error('LCH_SHARED_DONATE_URL not defined'));
	});

	it('returns error if LCH_SHARED_DONATE_URL blank', function () {
		deepEqual(mainModule.LCHSharedDonateLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_DONATE_URL: ' ',
		})), new Error('LCH_SHARED_DONATE_URL not defined'));
	});

});
