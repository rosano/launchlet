<script>
export let BuildPairExtensionPublicKey = '';
export const DispatchSendPayload = function(inputData) {
	mod.CommandPostPayload(inputData)
};

import { OLSKLocalized, _LCHIsTestingBehaviour } from '../../../_shared/common/global.js';
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

	// INTERFACE

	InterfaceSubmitButtonDidClick () {
		mod.CommandValidatePublicKey(BuildPairExtensionPublicKey.trim())
	},
	InterfaceUnpairButtonDidClick () {
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
		if (typeof inputData !== 'object' || inputData === null) {
			return;
		}

		mod.ValueStatus(inputData.LBXMessageResponse === 'bravo' ? 'kStatusSuccess' : 'kStatusFailed')
	},
	CommandPostPayload (inputData) {
		window.postMessage({
			LBXPayloadEncryptedData: inputData,
		}, window.location.href);
	},

}

window.addEventListener('message', mod.MessageReceived, false);
</script>

<div class="LCHComposeBuildPairExtension">
{#if mod._ValueFormIsVisible}
	<textarea class="LCHBuildPairExtensionPublicKeyField" placeholder="{ OLSKLocalized('LCHBuildPairExtensionPublicKeyFieldLabel') }" bind:value={ BuildPairExtensionPublicKey } autofocus ></textarea>
	<button class="LCHBuildPairExtensionSubmitButton" on:click={ mod.InterfaceSubmitButtonDidClick }>{ OLSKLocalized('LCHBuildPairExtensionSubmitButtonLabel') }</button>
{/if}

{#if !mod._ValueFormIsVisible}
	<button class="LCHBuildPairExtensionUnpairButton" on:click={ mod.InterfaceUnpairButtonDidClick }>{ OLSKLocalized('LCHBuildPairExtensionUnpairButtonText') }</button>
{/if}

{#if mod._ValueStatus === 'kStatusWaiting' }
	<span class="LCHBuildPairExtensionStatusWaiting"></span>
{/if}

{#if mod._ValueStatus === 'kStatusFailed' }
	<span class="LCHBuildPairExtensionStatusFailed"></span>
{/if}

</div>

<style src="./ui-style.css"></style>
