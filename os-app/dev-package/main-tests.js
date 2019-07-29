import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';
import { LCHLauncherModeDefault, LCHLauncherModeJump } from '../dev-launcher/ui-logic.js';

describe('kRunModeDefault', function testkRunModeDefault() {

	it('returns LCHLauncherModeDefault', function() {
		deepEqual(mainModule.kRunModeDefault, LCHLauncherModeDefault);
	});

});

describe('kRunModeJump', function testkRunModeJump() {

	it('returns LCHLauncherModeJump', function() {
		deepEqual(mainModule.kRunModeJump, LCHLauncherModeJump);
	});

});
