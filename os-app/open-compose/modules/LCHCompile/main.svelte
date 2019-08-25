<script>
export let CompileDocuments = [];
export let OLSKLocalized = null;

import { modelDidChange } from '../../persistence.js';
import { LCHCompileBoomarkletStringFor, LCHCompileBookmarkletBinaryFor } from './ui-logic.js';
import { LCHLauncherModeCommit, LCHLauncherModePipe } from '../../../dev-launcher/ui-logic.js';

let JavascriptComposition, JavascriptCompositionBinary = '';
let EnablePipe = false;

import { onMount } from 'svelte';
onMount(function () {
	modelDidChange.subscribe(function () {
		mod.reactJavascriptComposition()
	});
});
const mod = {
	interfaceEnablePipeToggleDidInput() {
		mod.reactJavascriptComposition();
	},

	// REACT

	reactJavascriptComposition() {
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
			LCHCompileToken_LCHLauncherMode: EnablePipe ? LCHLauncherModePipe() : LCHLauncherModeCommit(),
		});

		JavascriptCompositionBinary = LCHCompileBookmarkletBinaryFor(JavascriptComposition);
	},
};
</script>
	
<div class="Container">

<p>
	<label for="LCHCompileEnablePipeToggle">{ OLSKLocalized('LCHCompileEnablePipeToggleLabelText') }</label>
	<input type="checkbox" bind:checked={ EnablePipe } on:change={ mod.interfaceEnablePipeToggleDidInput } id="LCHCompileEnablePipeToggle" />

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
