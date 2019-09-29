import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LCHVitrineRouteGuard', function testLCHVitrineRouteGuard() {

	const StubEnvValid = function () {
		return {
			LCH_VITRINE_QUICKSILVER_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHVitrineRouteGuard(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns error if no LCH_VITRINE_QUICKSILVER_URL', function () {
		deepEqual(mainModule.LCHVitrineRouteGuard(Object.assign(StubEnvValid(), {
			LCH_VITRINE_QUICKSILVER_URL: null,
		})), new Error('LCH_VITRINE_QUICKSILVER_URL not defined'));
	});

	it('returns error if LCH_VITRINE_QUICKSILVER_URL blank', function () {
		deepEqual(mainModule.LCHVitrineRouteGuard(Object.assign(StubEnvValid(), {
			LCH_VITRINE_QUICKSILVER_URL: ' ',
		})), new Error('LCH_VITRINE_QUICKSILVER_URL not defined'));
	});

});
