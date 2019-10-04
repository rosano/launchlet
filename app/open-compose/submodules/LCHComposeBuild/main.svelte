<script>
export let BuildDocuments = [];
export let BuildInitializeModePipeEnabled;
export let BuildAppLanguageCode;
export let LCHComposeBuildPackageStyle;
export let LCHComposeBuildPackageScript;

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

import { LCHLauncherModeCommit, LCHLauncherModePipe } from '../../../dev-launcher/ui-logic.js';
import { LCHFlags } from '../../../_shared/LCHFlags/main.js'
import { LCHFormulaFrom, LCHFormulaToEvaluate } from '../../../_shared/LCHFormula/main.js'
import { modelDidChange } from '../../model.js'
import {
	LCHBuildRecipeArrayString,
	LCHBuildStripLivereload,
	LCHBuildStripSourceMap,
	LCHBuildBoomarkletTemplate,
	LCHBuildEscape,
} from '../LCHBuild/main.js';
import OLSKString from 'OLSKString';

import { storageClient } from '../../persistence.js';
import * as LCHSettingsAction from '../../../_shared/LCHSetting/action.js';

let JavascriptComposition, JavascriptCompositionBinary = '', RecipesArrayString;

export const _LCH_DISABLE_ENCRYPTION = function () {
	return false;
};

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

	// DATA

	DataPackageScript () {
		return [LCHComposeBuildPackageScript].map(LCHBuildStripLivereload).map(LCHBuildStripSourceMap).pop();
	},

	DataPackageStyle () {
		return [LCHComposeBuildPackageStyle].map(LCHBuildStripSourceMap).pop();
	},

	DataPackageOptions () {
		return {
			LCHOptionLanguage: BuildAppLanguageCode,
			LCHOptionMode: BuildInitializeModePipeEnabled ? LCHLauncherModePipe() : LCHLauncherModeCommit(),
			LCHOptionIncludePageRecipes: true,
		};
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
		if (!OLSK_TESTING_BEHAVIOUR()) {
			return;
		};

		event.preventDefault();
		
		setTimeout(function () {
			(new Function(JavascriptComposition))();
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
			LBXPayloadPackageScript: mod.DataPackageScript(),
			LBXPayloadPackageStyle: mod.DataPackageStyle(),
			LBXPayloadPackageOptions: mod.DataPackageOptions(),
			LBXPayloadRecipes: RecipesArrayString,
			LBXPayloadConfirmation: Math.random().toString(),
		};

		mod._LCHComposeBuildPairExtension.DispatchSendPayload(OLSK_TESTING_BEHAVIOUR() ? JSON.stringify(payload) : await mod._CommandEncrypt(JSON.stringify(payload), mod.ValuePublicKey()), payload.LBXPayloadConfirmation)
	},
	async _CommandEncrypt (param1, param2) {
		if (_LCH_DISABLE_ENCRYPTION()) {
			return Promise.resolve(param1);
		};

		return new Promise(function (resolve, reject) {;
			return simpleCrypto.asym.importEncryptPublicKey(param2, reject, function (inputData) {
				return simpleCrypto.asym.encrypt(inputData, (new TextEncoder()).encode(param1), reject, function (inputData) {
					return resolve((function SerializeCipher(inputData) {
						// javascript - Converting array buffer to string - Maximum call stack size exceeded - Stack Overflow https://stackoverflow.com/a/20604561
						function ab2str(buffer) {
							var bufView = new Uint16Array(buffer);
							var length = bufView.length;
							var result = '';
							var addition = Math.pow(2,16)-1;

							for(var i = 0;i<length;i+=addition){

							    if(i + addition > length){
							        addition = length - i;
							    }
							    result += String.fromCharCode.apply(null, bufView.subarray(i,i+addition));
							}

							return result;
						};

						return JSON.stringify(Object.keys(inputData).reduce(function (coll, item) {
							coll[item] = ab2str(inputData[item]);

							return coll;
						}, {}));
					})(inputData));
				});
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
		const validDocuments = BuildDocuments.map(function (e) {
			return Object.entries(mod._CommandFlagDocument(e)).map(function (e) {
				if (e[0] === 'LCHDocumentCallbackBody' && !e[1]) { // #purge
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
		});

		RecipesArrayString = LCHBuildRecipeArrayString(validDocuments);

		JavascriptComposition = OLSKString.OLSKStringReplaceTokens(LCHBuildBoomarkletTemplate(), {
			LCHBuildBoomarkletTemplate_Style: mod.DataPackageStyle(),
			LCHBuildBoomarkletTemplate_Script: mod.DataPackageScript(),
			LCHBuildBoomarkletTemplate_Options: JSON.stringify(mod.DataPackageOptions()),
			LCHBuildBoomarkletTemplate_Recipes: RecipesArrayString,
		})

		JavascriptCompositionBinary = LCHBuildEscape(JavascriptComposition);

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

import LCHComposeBuildPairExtension from '../LCHComposeBuildPairExtension/main.svelte';
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>
	
<div class="Container">

	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<!-- <textarea onclick="this.select()">{ JavascriptComposition }</textarea> -->

			<a id="LCHComposeBuildAnchor" href="{ JavascriptCompositionBinary }" accesskey="r" on:click={ mod.InterfaceRunButtonDidClick }>{ OLSKLocalized('LCHComposeBuildAnchorText') }</a>

			<label for="LCHComposeBuildModePipeEnabledToggle">{ OLSKLocalized('LCHComposeBuildModePipeEnabledToggleLabelText') }</label>
			<input type="checkbox" bind:checked={ BuildInitializeModePipeEnabled } on:change={ mod.InterfaceModePipeEnabledToggleDidInput } id="LCHComposeBuildModePipeEnabledToggle" />
		</OLSKToolbarElementGroup>

		{#if !mod.ValuePairExtensionIsVisible()}
			<button class="LCHComposeBuildPairButton" on:click={ mod.InterfaceModePairButtonDidClick }>{ OLSKLocalized('LCHComposeBuildPairButtonText') }</button>
		{/if}

		{#if mod.ValuePairExtensionIsVisible()}
			<LCHComposeBuildPairExtension BuildPairExtensionPublicKey={ mod._ValuePublicKey } on:BuildPairExtensionDispatchPublicKeyUpdate={ mod.BuildPairExtensionDispatchPublicKeyUpdate } bind:this={ mod._LCHComposeBuildPairExtension } />
		{/if}
	</OLSKToolbar>

</div>

<style src="./ui-style.css"></style>
