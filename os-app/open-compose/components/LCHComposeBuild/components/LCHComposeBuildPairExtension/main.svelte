<script>
export let BuildPairExtensionPublicKey = '';

import { OLSKLocalized } from '../../../../../_shared/common/global.js';
import { LCHComposeBuildPairExtensionPublicKeyIsValid } from './ui-logic.js';

const mod = {

	// VALUE

	_ValueAlertIsVisible: false,
	ValueAlertIsVisible(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueAlertIsVisible;
		}

		mod._ValueAlertIsVisible = inputData
	},

	// INTERFACE

	InterfaceSubmitButtonDidClick () {
		if (!LCHComposeBuildPairExtensionPublicKeyIsValid(BuildPairExtensionPublicKey)) {
			mod.ValueAlertIsVisible(true)
		};
	},

}
</script>

{#if mod._ValueAlertIsVisible}
	<p class="LCHBuildPairExtensionErrorAlert"></p>
{/if}

<textarea class="LCHBuildPairExtensionPublicKeyField" placeholder="{ OLSKLocalized('LCHBuildPairExtensionPublicKeyFieldLabel') }" bind:value={ BuildPairExtensionPublicKey } ></textarea>
<button class="LCHBuildPairExtensionSubmitButton" on:click={ mod.InterfaceSubmitButtonDidClick }>{ OLSKLocalized('LCHBuildPairExtensionSubmitButtonLabel') }</button>

<style src="./ui-style.css"></style>
