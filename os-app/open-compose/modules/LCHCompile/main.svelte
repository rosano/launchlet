<script>
import { DocumentsAllStore, modelDidChange } from '../../persistence.js';
import { LCHCompileBoomarkletStringFor, LCHCompileBookmarkletBinaryFor } from './ui-logic.js';
import { LCHLauncherModeCommit, LCHLauncherModePipe } from '../../../dev-launcher/ui-logic.js';

let javascriptComposed, javascriptBinary = '';

import { onMount } from 'svelte';
onMount(function () {
	modelDidChange.subscribe(function (val) {
		javascriptComposed = LCHCompileBoomarkletStringFor({
			LCHCompileToken_AppStyle: window.LCHComposeLauncherStyle.textContent,
			LCHCompileToken_AppBehaviour: window.LCHComposeLauncherBehaviour.textContent,
			LCHCompileToken_DocumentObjects: $DocumentsAllStore.map(function (e) {
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
			LCHCompileToken_LCHLauncherMode: LCHLauncherModeCommit(),
		});

		javascriptBinary = LCHCompileBookmarkletBinaryFor(javascriptComposed);
	});
});
</script>
	
<div class="Container">

<p>
	<textarea onclick="this.select()">{ javascriptComposed }</textarea>
</p>

<p>
	<a id="LCHComposeBuildLink" href="{ javascriptBinary }"  accesskey="r">Try it</a>
</p>

</div>

<style>
</style>
