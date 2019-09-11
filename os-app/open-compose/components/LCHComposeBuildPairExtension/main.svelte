<script>
export let BuildPairExtensionPublicKey = '';

import { OLSKLocalized } from '../../../_shared/common/global.js';
import { LCHComposeBuildPairExtensionPublicKeyIsValid } from './ui-logic.js';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {

	// VALUE

	_ValueFormIsVisible: true,
	ValueFormIsVisible(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueFormIsVisible;
		}

		mod._ValueFormIsVisible = inputData
	},

	// INTERFACE

	InterfaceSubmitButtonDidClick () {
		mod.CommandValidateInput()
	},

	// COMMAND

	CommandValidateInput () {
		const outputData = BuildPairExtensionPublicKey.trim()

		if (!LCHComposeBuildPairExtensionPublicKeyIsValid(outputData)) {
			return window.alert(OLSKLocalized('LCHBuildPairExtensionAlertText'));
		};

		mod.ValueFormIsVisible(false)

		dispatch('BuildPairExtensionDispatchUpdate', outputData);
	},

}
</script>

{#if mod._ValueFormIsVisible}
	<textarea class="LCHBuildPairExtensionPublicKeyField" placeholder="{ OLSKLocalized('LCHBuildPairExtensionPublicKeyFieldLabel') }" bind:value={ BuildPairExtensionPublicKey } ></textarea>
	<button class="LCHBuildPairExtensionSubmitButton" on:click={ mod.InterfaceSubmitButtonDidClick }>{ OLSKLocalized('LCHBuildPairExtensionSubmitButtonLabel') }</button>
{/if}

<style src="./ui-style.css"></style>
