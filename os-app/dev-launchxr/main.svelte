<script>
export let LRTOptions;
export let LRTDidFinish;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[LRTOptions.LCHOptionLanguage]);
};

import { OLSK_SPEC_UI } from 'OLSKSpec';

import LCHLauncherLogic from './logic.js';

const mod = {

	// CONTROL

	ControlExit () {
		LRTDidFinish();
	},

	// MESSAGE

	LCHLauncherCommandDidSelect (inputData) {
		inputData.LCHRecipeCallback();
	},

};

import LCHLauncherCommand from './submodules/sub-command/main.svelte';
import LCHLauncherPipe from './submodules/sub-pipe/main.svelte';
</script>

{#if LRTOptions.LCHOptionMode === LCHLauncherLogic.LCHLauncherModeCommand() }
	<LCHLauncherCommand LCHLauncherCommandItems={ LRTOptions.LCHOptionRecipes } { OLSKLocalized } LCHLauncherCommandDidSelect={ mod.LCHLauncherCommandDidSelect } LCHLauncherCommandDidTerminate={ mod.ControlExit } />
{/if}

{#if LRTOptions.LCHOptionMode === LCHLauncherLogic.LCHLauncherModePipe() }
	<LCHLauncherPipe LCHLauncherPipeItems={ LRTOptions.LCHOptionRecipes } { OLSKLocalized } />
{/if}

{#if OLSK_SPEC_UI() }
	<button id="TestLCHDebugCloseButton" on:click={ mod.ControlExit }></button>
{/if}
