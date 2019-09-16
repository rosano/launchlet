<script>
export let BuildDocuments = [];
export let BuildInitializeModePipeEnabled;
export let BuildAppStyle;
export let BuildAppBehaviour;
export let BuildAppLanguageCode;

import LCHComposeBuildPairExtension from '../LCHComposeBuildPairExtension/main.svelte';
import { OLSKLocalized, _LCHIsTestingBehaviour, _LCH_DISABLE_ENCRYPTION } from '../../../_shared/common/global.js';
import { LCHComposeBuildBoomarkletStringFor, LCHComposeBuildBookmarkletBinaryFor } from './ui-logic.js';
import { LCHLauncherModeCommit, LCHLauncherModePipe } from '../../../dev-launcher/ui-logic.js';
import { LCHFlags } from '../../../_shared/LCHFlags/main.js'
import { LCHFormulaFrom, LCHFormulaToEvaluate } from '../../../_shared/LCHFormula/main.js'
import { modelDidChange } from '../../model.js'

import { storageClient } from '../../persistence.js';
import * as LCHSettingsAction from '../../../_shared/LCHSetting/action.js';

let JavascriptComposition, JavascriptCompositionBinary = '';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
const mod = {

	ModelDidChange (val) {
		if (!val) {
			return;
		};

		mod.ReactJavascriptComposition();
	},

	BuildPairExtensionDispatchPublicKeyUpdate (inputData) {
		mod.CommandUpdatePublicKey(inputData.detail)
	},

	// VALUE

	_ValuePublicKey: null,
	ValuePublicKey(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePublicKey;
		}

		mod._ValuePublicKey = inputData

		mod.ValuePairExtensionIsVisible(!!inputData)
	},
	_ValuePairExtensionIsVisible: false,
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

	InterfaceRunButtonDidClick(event) {
		if (!_LCHIsTestingBehaviour()) {
			return;
		};

		event.preventDefault();
		
		setTimeout(function () {
			eval(JavascriptComposition)
		})
	},

	// COMMAND

	async CommandUpdatePublicKey(inputData) {
		await LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'LCHSettingComposePublicKey', inputData)
		
		mod.ValuePublicKey(JSON.parse(inputData || 'null'))

		if (!inputData) {
			return;
		};

		mod.CommandSendPayload()
	},
	_LCHComposeBuildPairExtension: undefined,
	async CommandSendPayload() {
		const payload = {
			LBXPayloadBookmarklet: JavascriptComposition,
			LBXPayloadHash: Math.random().toString(),
		};
		mod._LCHComposeBuildPairExtension.DispatchSendPayload(_LCHIsTestingBehaviour() ? JSON.stringify(payload) : await mod._CommandEncrypt(JSON.stringify(payload), mod.ValuePublicKey()), payload.LBXPayloadHash)
	},
	async _CommandEncrypt (param1, param2) {
		if (_LCH_DISABLE_ENCRYPTION()) {
			return Promise.resolve(param1);
		};

		return new Promise(function (resolve, reject) {
			return simpleCrypto.asym.importEncryptPublicKey(param2, reject, function (inputData) {
				return simpleCrypto.asym.encrypt(inputData, (new TextEncoder()).encode(param1), reject, resolve);
			})
		})
	},

	_CommandFlagDocument(inputData) {
		let outputData = {};

		try {
			outputData.LCHDocumentIsFlagged = !!LCHFlags(LCHFormulaToEvaluate(LCHFormulaFrom(inputData)));
		} catch (e) {
			if (!e.name.match('SyntaxError')) {
				throw e
			}

			outputData = {
				LCHDocumentIsFlagged: true,
				LCHDocumentSyntaxErrorMessage: e.message,
			};
		}

		return Object.assign(inputData, outputData)
	},

	// REACT

	ReactJavascriptComposition() {
		JavascriptComposition = LCHComposeBuildBoomarkletStringFor({
			LCHComposeBuildToken_AppStyle: BuildAppStyle,
			LCHComposeBuildToken_AppBehaviour: BuildAppBehaviour,
			LCHComposeBuildToken_DocumentObjects: BuildDocuments.map(function (e) {
				return Object.entries(mod._CommandFlagDocument(e)).map(function (e) {
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
			}).filter(function (e) {
				return !e.LCHDocumentIsFlagged;
			}),
			LCHComposeBuildToken_AppLanguageCode: BuildAppLanguageCode,
			LCHComposeBuildToken_LCHLauncherMode: BuildInitializeModePipeEnabled ? LCHLauncherModePipe() : LCHLauncherModeCommit(),
			LCHComposeBuildToken_LCHComposeRecipeName: OLSKLocalized('LCHComposeTitle'),
			LCHComposeBuildToken_LCHComposeRecipeCallbackOutput: window.location.href,
		});

		JavascriptCompositionBinary = LCHComposeBuildBookmarkletBinaryFor(JavascriptComposition);

		if (!mod.ValuePublicKey()) {
			return;
		};

		mod.CommandSendPayload()
	},

	// SETUP

	SetupEverything() {
		mod.SetupPublicKey()
	},
	async SetupPublicKey() {
		mod.ValuePublicKey(JSON.parse(await LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'LCHSettingComposePublicKey') || 'null'));
	},

	// LIFECYCLE

	LifecycleComponentWillMount() {
		mod.SetupEverything()
	},

};

mod.LifecycleComponentWillMount();

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
	<a id="LCHComposeBuildAnchor" href="{ JavascriptCompositionBinary }" accesskey="r" on:click={ mod.InterfaceRunButtonDidClick }>Try it</a>
</p>

{#if !mod.ValuePairExtensionIsVisible()}
	<button class="LCHComposeBuildPairButton" on:click={ mod.InterfaceModePairButtonDidClick }>{ OLSKLocalized('LCHComposeBuildPairButtonText') }</button>
{/if}

{#if mod.ValuePairExtensionIsVisible()}
	<LCHComposeBuildPairExtension BuildPairExtensionPublicKey={ mod._ValuePublicKey } on:BuildPairExtensionDispatchPublicKeyUpdate={ mod.BuildPairExtensionDispatchPublicKeyUpdate } bind:this={ mod._LCHComposeBuildPairExtension } />
{/if}

</div>

<style src="./ui-style.css"></style>
