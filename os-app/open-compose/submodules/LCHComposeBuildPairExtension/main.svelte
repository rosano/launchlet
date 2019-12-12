<script>
export let BuildPairExtensionPublicKey = '';
export const DispatchSendPayload = function(param1, param2) {
	mod.ControlPostPayload(param1)

	mod.ValuePayloadHash(param2)
};

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

import { LBXResponseIsValid } from './logic.js';
import { LCHComposeBuildPairExtensionPublicKeyIsValid } from './ui-logic.js';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {

	MessageReceived(event) {
		// We only accept messages from ourselves
	  if (event.source !== window && !OLSK_TESTING_BEHAVIOUR()) {
	    return;
	  }

  	// We only accept messages from ourselves
    // if (not launchlet.dev) {
    //   return;
    // }

	  mod.ControlValidateMessageData(event.data);
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

	InterfaceFormDidSubmit (event) {
		event.preventDefault()
		
		mod.ControlValidatePublicKey(BuildPairExtensionPublicKey.trim())
	},

	InterfaceDeleteKeyButtonDidClick () {
		dispatch('BuildPairExtensionDispatchPublicKeyUpdate', '');
	},

	// CONTROL

	ControlValidatePublicKey (inputData) {
		if (!LCHComposeBuildPairExtensionPublicKeyIsValid(inputData)) {
			return window.alert(OLSKLocalized('LCHBuildPairExtensionAlertText'));
		};

		mod.ValueFormIsVisible(false)

		dispatch('BuildPairExtensionDispatchPublicKeyUpdate', inputData);
	},
	ControlValidateMessageData (inputData) {
		if (!LBXResponseIsValid(inputData)) {
			return;
		};

		mod.ValueStatus(inputData.LBXResponseHash === (OLSK_TESTING_BEHAVIOUR() ? 'LBX_TESTING_RESPONSE_HASH' : mod.ValuePayloadHash()) ? 'kStatusSuccess' : 'kStatusFailed')

		if (mod.ValueStatus() === 'kStatusFailed') {
			mod.ValueStatusFailedError(inputData.LBXResponseError)
		};
	},
	ControlPostPayload (inputData) {
		window.postMessage({
			LBXRequestName: 'DispatchRequestStorePayload',
			LBXRequestEncryptedData: inputData,
		}, window.location.href);
	},

}

window.addEventListener('message', mod.MessageReceived, false);
</script>

<div class="LCHComposeBuildPairExtension">
{#if mod.ValueFormIsVisible()}
	<form on:submit={ mod.InterfaceFormDidSubmit }>
		<input class="LCHBuildPairExtensionPublicKeyField" placeholder="{ OLSKLocalized('LCHBuildPairExtensionPublicKeyFieldLabel') }" bind:value={ BuildPairExtensionPublicKey } autofocus />
		
		<button class="LCHBuildPairExtensionSubmitButton">{ OLSKLocalized('LCHBuildPairExtensionSubmitButtonLabel') }</button>
	</form>
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
