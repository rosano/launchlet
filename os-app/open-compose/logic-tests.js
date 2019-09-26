import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LCHComposeRouteGuard', function testLCHComposeRouteGuard() {

	const StubEnvValid = function () {
		return {
			LCH_COMPOSE_DONATE_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHComposeRouteGuard(null);
		}, /RCSErrorInputInvalid/);
	});

	it('returns error if no LCH_COMPOSE_DONATE_URL', function () {
		deepEqual(mainModule.LCHComposeRouteGuard(Object.assign(StubEnvValid(), {
			LCH_COMPOSE_DONATE_URL: null,
		})), new Error('LCH_COMPOSE_DONATE_URL not defined'));
	});

	it('returns error if LCH_COMPOSE_DONATE_URL blank', function () {
		deepEqual(mainModule.LCHComposeRouteGuard(Object.assign(StubEnvValid(), {
			LCH_COMPOSE_DONATE_URL: ' ',
		})), new Error('LCH_COMPOSE_DONATE_URL blank'));
	});

});
