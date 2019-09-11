<script>
export let BuildPairExtensionPublicKey = '';

import { OLSKLocalized } from '../../../_shared/common/global.js';
import { LCHComposeBuildPairExtensionPublicKeyIsValid } from './ui-logic.js';

const mod = {

	// VALUE

	_ValueFormIsVisible: true,
	ValueFormIsVisible(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueFormIsVisible;
		}

		mod._ValueFormIsVisible = inputData
	},
	_ValueAlertIsVisible: false,
	ValueAlertIsVisible(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueAlertIsVisible;
		}

		mod._ValueAlertIsVisible = inputData
	},

	// INTERFACE

	InterfaceSubmitButtonDidClick () {
		mod.CommandValidateInput()
	},

	// COMMAND

	CommandValidateInput () {
		if (!LCHComposeBuildPairExtensionPublicKeyIsValid(BuildPairExtensionPublicKey.trim())) {
			return window.alert(OLSKLocalized('LCHBuildPairExtensionAlertText'));
		};

		mod.ValueFormIsVisible(false)
	},

}
</script>

{#if mod._ValueFormIsVisible}
	<textarea class="LCHBuildPairExtensionPublicKeyField" placeholder="{ OLSKLocalized('LCHBuildPairExtensionPublicKeyFieldLabel') }" bind:value={ BuildPairExtensionPublicKey } ></textarea>
	<button class="LCHBuildPairExtensionSubmitButton" on:click={ mod.InterfaceSubmitButtonDidClick }>{ OLSKLocalized('LCHBuildPairExtensionSubmitButtonLabel') }</button>
{/if}

<style src="./ui-style.css"></style>
