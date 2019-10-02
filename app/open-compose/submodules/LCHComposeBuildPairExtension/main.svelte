<script>
export let BuildPairExtensionPublicKey = '';
export const DispatchSendPayload = function(param1, param2) {
	mod.CommandPostPayload(param1)

	mod.ValuePayloadHash(param2)
};

import { OLSKLocalized, _LCHIsTestingBehaviour } from '../../../_shared/common/global.js';
import { LBXResponseIsValid } from './logic.js';
import { LCHComposeBuildPairExtensionPublicKeyIsValid } from './ui-logic.js';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {

	MessageReceived(event) {
		// We only accept messages from ourselves
	  if (event.source !== window && !_LCHIsTestingBehaviour()) {
	    return;
	  }

  	// We only accept messages from ourselves
    // if (not launchlet.dev) {
    //   return;
    // }

	  mod.CommandValidateMessageData(event.data);
	},

	// VALUE

	_ValueFormIsVisible: !BuildPairExtensionPublicKey,
	ValueFormIsVisible(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueFormIsVisible;
		}

		mod._ValueFormIsVisible = inputData
	},
	_ValueStatus: 'kStatusWaiting',
	ValueStatus(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueStatus;
		}

		mod._ValueStatus = inputData
	},
	_ValueStatusFailedError: '',
	ValueStatusFailedError(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueStatusFailedError;
		}

		mod._ValueStatusFailedError = inputData
	},
	_ValuePayloadHash: undefined,
	ValuePayloadHash(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePayloadHash;
		}

		mod._ValuePayloadHash = inputData
	},

	// INTERFACE

	InterfaceSubmitButtonDidClick () {
		mod.CommandValidatePublicKey(BuildPairExtensionPublicKey.trim())
	},
	InterfaceDeleteKeyButtonDidClick () {
		dispatch('BuildPairExtensionDispatchPublicKeyUpdate', '');
	},

	// COMMAND

	CommandValidatePublicKey (inputData) {
		if (!LCHComposeBuildPairExtensionPublicKeyIsValid(inputData)) {
			return window.alert(OLSKLocalized('LCHBuildPairExtensionAlertText'));
		};

		mod.ValueFormIsVisible(false)

		dispatch('BuildPairExtensionDispatchPublicKeyUpdate', inputData);
	},
	CommandValidateMessageData (inputData) {
		if (!LBXResponseIsValid(inputData)) {
			return;
		};

		mod.ValueStatus(inputData.LBXResponseHash === (_LCHIsTestingBehaviour() ? 'LBX_TESTING_RESPONSE_HASH' : mod.ValuePayloadHash()) ? 'kStatusSuccess' : 'kStatusFailed')

		if (mod.ValueStatus() === 'kStatusFailed') {
			mod.ValueStatusFailedError(inputData.LBXResponseError)
		};
	},
	CommandPostPayload (inputData) {
		window.postMessage({
			LBXMessageEncryptedData: inputData,
		}, window.location.href);
	},

}

window.addEventListener('message', mod.MessageReceived, false);
</script>

<div class="LCHComposeBuildPairExtension">
{#if mod.ValueFormIsVisible()}
	<textarea class="LCHBuildPairExtensionPublicKeyField" placeholder="{ OLSKLocalized('LCHBuildPairExtensionPublicKeyFieldLabel') }" bind:value={ BuildPairExtensionPublicKey } autofocus ></textarea>
	<button class="LCHBuildPairExtensionSubmitButton" on:click={ mod.InterfaceSubmitButtonDidClick }>{ OLSKLocalized('LCHBuildPairExtensionSubmitButtonLabel') }</button>
{/if}

{#if !mod.ValueFormIsVisible()}
	<button class="LCHBuildPairExtensionDeleteKeyButton" on:click={ mod.InterfaceDeleteKeyButtonDidClick }>{ OLSKLocalized('LCHBuildPairExtensionDeleteKeyButtonText') }</button>
{/if}

{#if mod.ValueStatus() === 'kStatusWaiting' }
	<span class="LCHBuildPairExtensionStatusWaiting">{ OLSKLocalized('LCHBuildPairExtensionStatusWaitingText') }</span>
{/if}

{#if mod.ValueStatus() === 'kStatusFailed' }
	<span class="LCHBuildPairExtensionStatusFailed">{ OLSKLocalized('LCHBuildPairExtensionStatusFailedText') }</span>
	<span class="LCHBuildPairExtensionStatusFailedError">{ mod.ValueStatusFailedError() }</span>
{/if}

</div>

<style src="./ui-style.css"></style>
