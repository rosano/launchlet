<script>
export let BuildDocuments = [];
export let BuildInitializeModePipeEnabled;
export let BuildAppStyle;
export let BuildAppBehaviour;
export let BuildAppLanguageCode;
export let BuildPublicKey = null;

import LCHComposeBuildPairExtension from '../LCHComposeBuildPairExtension/main.svelte';
import { OLSKLocalized } from '../../../_shared/common/global.js';
import { LCHComposeBuildBoomarkletStringFor, LCHComposeBuildBookmarkletBinaryFor } from './ui-logic.js';
import { LCHLauncherModeCommit, LCHLauncherModePipe } from '../../../dev-launcher/ui-logic.js';
import { modelDidChange } from '../../model.js'

import { storageClient } from '../../persistence.js';
import * as LCHSettingsAction from '../../../_shared/LCHSetting/action.js';

let JavascriptComposition, JavascriptCompositionBinary = '';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
const mod = {

	ModelDidChange () {
		mod.ReactJavascriptComposition();
	},

	async BuildPairExtensionDispatchPublicKeyUpdate (inputData) {;
		await LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'LCHSettingComposePublicKey', inputData.detail)
	},

	// VALUE

	_ValuePairExtensionIsVisible: !!BuildPublicKey,
	ValuePairExtensionIsVisible(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePairExtensionIsVisible;
		}

		mod._ValuePairExtensionIsVisible = inputData
	},

	// INTERFACE

	InterfaceModePipeEnabledToggleDidInput() {
		dispatch('BuildDispatchModePipeEnabledToggleDidInput', BuildInitializeModePipeEnabled);

		modelDidChange.set(Date.now());
	},
	InterfaceModePairButtonDidClick() {
		mod.ValuePairExtensionIsVisible(!mod.ValuePairExtensionIsVisible())
	},

	// REACT

	ReactJavascriptComposition() {
		JavascriptComposition = LCHComposeBuildBoomarkletStringFor({
			LCHComposeBuildToken_AppStyle: BuildAppStyle,
			LCHComposeBuildToken_AppBehaviour: BuildAppBehaviour,
			LCHComposeBuildToken_DocumentObjects: BuildDocuments.map(function (e) {
				return Object.entries(e).map(function (e) {
					if (e[0] === 'LCHDocumentBody' && !e[1]) { // #purge
						e[1] = 'return'
					};

					return e;
				}).filter(function (e) {
					if (typeof e[1] === 'string' && !e[1]) {
						return false;
					}

					return true;
				}).reduce(function (coll, item) {
					coll[item[0]] = item[1];

					return coll;
				}, {});
			}),
			LCHComposeBuildToken_AppLanguageCode: BuildAppLanguageCode,
			LCHComposeBuildToken_LCHLauncherMode: BuildInitializeModePipeEnabled ? LCHLauncherModePipe() : LCHLauncherModeCommit(),
			LCHComposeBuildToken_LCHComposeRecipeName: OLSKLocalized('LCHComposeTitle'),
			LCHComposeBuildToken_LCHComposeRecipeCallbackOutput: window.location.href,
		});

		JavascriptCompositionBinary = LCHComposeBuildBookmarkletBinaryFor(JavascriptComposition);
	},

};

modelDidChange.subscribe(mod.ModelDidChange);
</script>
	
<div class="Container">

<p>
	<label for="LCHComposeBuildModePipeEnabledToggle">{ OLSKLocalized('LCHComposeBuildModePipeEnabledToggleLabelText') }</label>
	<input type="checkbox" bind:checked={ BuildInitializeModePipeEnabled } on:change={ mod.InterfaceModePipeEnabledToggleDidInput } id="LCHComposeBuildModePipeEnabledToggle" />

</p>

<p>
	<textarea onclick="this.select()">{ JavascriptComposition }</textarea>
</p>

<p>
	<a id="LCHComposeBuildLink" href="{ JavascriptCompositionBinary }"  accesskey="r">Try it</a>
</p>

{#if !mod.ValuePairExtensionIsVisible()}
	<button class="LCHComposeBuildPairButton" on:click={ mod.InterfaceModePairButtonDidClick }>{ OLSKLocalized('LCHComposeBuildPairButtonText') }</button>
{/if}

{#if mod.ValuePairExtensionIsVisible()}
	<LCHComposeBuildPairExtension on:BuildPairExtensionDispatchPublicKeyUpdate={ mod.BuildPairExtensionDispatchPublicKeyUpdate } />
{/if}

</div>

<style src="./ui-style.css"></style>
