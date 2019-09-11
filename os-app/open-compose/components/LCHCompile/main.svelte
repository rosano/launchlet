<script>
export let CompileDocuments = [];
export let CompileInitializeModePipeEnabled;
export let CompileAppStyle;
export let CompileAppBehaviour;
export let CompileAppLanguageCode;

import { OLSKLocalized } from '../../../_shared/common/global.js';
import { LCHCompileBoomarkletStringFor, LCHCompileBookmarkletBinaryFor } from './ui-logic.js';
import { LCHLauncherModeCommit, LCHLauncherModePipe } from '../../../dev-launcher/ui-logic.js';
import { modelDidChange } from '../../model.js'

let JavascriptComposition, JavascriptCompositionBinary = '';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
const mod = {

	ModelDidChange () {
		mod.ReactJavascriptComposition();
	},

	// INTERFACE

	async InterfaceModePipeEnabledToggleDidInput() {
		dispatch('CompileDispatchModePipeEnabledToggleDidInput', CompileInitializeModePipeEnabled);

		modelDidChange.set(Date.now());
	},

	// REACT

	ReactJavascriptComposition() {
		JavascriptComposition = LCHCompileBoomarkletStringFor({
			LCHCompileToken_AppStyle: CompileAppStyle,
			LCHCompileToken_AppBehaviour: CompileAppBehaviour,
			LCHCompileToken_DocumentObjects: CompileDocuments.map(function (e) {
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
			LCHCompileToken_AppLanguageCode: CompileAppLanguageCode,
			LCHCompileToken_LCHLauncherMode: CompileInitializeModePipeEnabled ? LCHLauncherModePipe() : LCHLauncherModeCommit(),
			LCHCompileToken_LCHComposeRecipeName: OLSKLocalized('LCHComposeTitle'),
			LCHCompileToken_LCHComposeRecipeCallbackOutput: window.location.href,
		});

		JavascriptCompositionBinary = LCHCompileBookmarkletBinaryFor(JavascriptComposition);
	},

};

modelDidChange.subscribe(mod.ModelDidChange);
</script>
	
<div class="Container">

<p>
	<label for="LCHCompileModePipeEnabledToggle">{ OLSKLocalized('LCHCompileModePipeEnabledToggleLabelText') }</label>
	<input type="checkbox" bind:checked={ CompileInitializeModePipeEnabled } on:change={ mod.InterfaceModePipeEnabledToggleDidInput } id="LCHCompileModePipeEnabledToggle" />

</p>

<p>
	<textarea onclick="this.select()">{ JavascriptComposition }</textarea>
</p>

<p>
	<a id="LCHComposeBuildLink" href="{ JavascriptCompositionBinary }"  accesskey="r">Try it</a>
</p>

</div>

<style src="./ui-style.css"></style>
