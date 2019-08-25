<script>
export let CompileDocuments = [];
export let OLSKLocalized = null;

import { storageClient, modelDidChange } from '../../persistence.js';
import * as LCHSettingsAction from '../../../_shared/rs-modules/lch_settings/action.js';
import { LCHCompileBoomarkletStringFor, LCHCompileBookmarkletBinaryFor } from './ui-logic.js';
import { LCHLauncherModeCommit, LCHLauncherModePipe } from '../../../dev-launcher/ui-logic.js';

let JavascriptComposition, JavascriptCompositionBinary = '';
let _ValueModePipeEnabled = false;

import { onMount } from 'svelte';
onMount(function () {
	modelDidChange.subscribe(function () {
		mod.ReactJavascriptComposition()
	});
});
const mod = {

	// VALUE

	ValueModePipeEnabled(inputData) {
		if (typeof inputData === 'undefined') {
			return _ValueModePipeEnabled;
		};

		_ValueModePipeEnabled = inputData;

		mod.ReactJavascriptComposition();
	},

	// INTERFACE

	async InterfaceModePipeEnabledToggleDidInput() {
		mod.ReactJavascriptComposition();
		
		await LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'LCHSettingComposeModePipeEnabled', mod.ValueModePipeEnabled().toString());
	},

	// REACT

	ReactJavascriptComposition() {
		JavascriptComposition = LCHCompileBoomarkletStringFor({
			LCHCompileToken_AppStyle: window.LCHComposeLauncherStyle.textContent,
			LCHCompileToken_AppBehaviour: window.LCHComposeLauncherBehaviour.textContent,
			LCHCompileToken_DocumentObjects: CompileDocuments.map(function (e) {
				return Object.entries(e).filter(function (e) {
					if (typeof e[1] === 'string' && !e[1]) {
						return false;
					}

					return true;
				}).reduce(function (coll, item) {
					coll[item[0]] = item[1];

					return coll;
				}, {});
			}),
			LCHCompileToken_AppLanguageCode: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
			LCHCompileToken_LCHLauncherMode: mod.ValueModePipeEnabled() ? LCHLauncherModePipe() : LCHLauncherModeCommit(),
		});

		JavascriptCompositionBinary = LCHCompileBookmarkletBinaryFor(JavascriptComposition);
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueModePipeEnabled();
	},
	async SetupValueModePipeEnabled() {
		mod.ValueModePipeEnabled(await LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'LCHSettingComposeModePipeEnabled'));
	},
};

mod.SetupEverything();
</script>
	
<div class="Container">

<p>
	<label for="LCHCompileModePipeEnabledToggle">{ OLSKLocalized('LCHCompileModePipeEnabledToggleLabelText') }</label>
	<input type="checkbox" bind:checked={ _ValueModePipeEnabled } on:change={ mod.InterfaceModePipeEnabledToggleDidInput } id="LCHCompileModePipeEnabledToggle" />

</p>

<p>
	<textarea onclick="this.select()">{ JavascriptComposition }</textarea>
</p>

<p>
	<a id="LCHComposeBuildLink" href="{ JavascriptCompositionBinary }"  accesskey="r">Try it</a>
</p>

</div>

<style>
.Container {
	border-top: var(--LCHBorderStyle);
}
</style>
