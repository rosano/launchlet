<script>
export let LRTOptions;
export let LRTDidFinish;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[LRTOptions.LCHOptionLanguage]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import LCHLaunchxrLogic from './logic.js';

const mod = {

	// CONTROL

	ControlExit () {
		LRTDidFinish();
	},

	// MESSAGE

	LCHLaunchxrCommandDidSelect (inputData) {
		inputData.LCHRecipeCallback();

		mod.ControlExit();
	},

};

import LCHLaunchxrCommand from './submodules/sub-command/main.svelte';
import LCHLaunchxrPipe from './submodules/sub-pipe/main.svelte';
</script>

{#if LRTOptions.LCHOptionMode === LCHLaunchxrLogic.LCHLaunchxrModeCommand() }
	<LCHLaunchxrCommand LCHLaunchxrCommandItems={ LRTOptions.LCHOptionRecipes } { OLSKLocalized } LCHLaunchxrCommandDidSelect={ mod.LCHLaunchxrCommandDidSelect } />
{/if}

{#if LRTOptions.LCHOptionMode === LCHLaunchxrLogic.LCHLaunchxrModePipe() }
	<LCHLaunchxrPipe />
{/if}

{#if OLSK_TESTING_BEHAVIOUR() }
	<button id="TestLCHDebugCloseButton" on:click={ mod.ControlExit }></button>
{/if}
