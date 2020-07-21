<script>
const LRTOptions = {
	LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
};

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[LRTOptions.LCHOptionLanguage]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
</script>

<div class="LCHLaunchxr">

{#if OLSK_TESTING_BEHAVIOUR() }
	<button id="TestLCHDebugCloseButton" on:click={ mod.ControlExit }></button>
{/if}

</div>
