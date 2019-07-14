<script>
import { membersAll, modelDidChange } from './persistence.js';
import * as LCHMembersModel from '../_shared/rs-modules/lch_members/model.js';
import LCHCompile from '../open-compose/main.js';
import d3 from '../_shared/_external/d3-selection/dist/d3-selection.min.js';

import { onMount } from 'svelte';
onMount(function () {
	modelDidChange.subscribe(function (val) {
		let bookmarklet = LCHCompile.LCHBookmarkletTextForTokenHash(LCHCompile.LCHTokenHashFor({
			LCHInputMemberObjects: $membersAll.filter(function (e) {
				return !!e.LCHMemberBody;
			}).map(LCHMembersModel.LCHMembersModelConvertLegacy).map(LCHCompile.LCHWrappedMemberObjectFor),
			LCHInputStyleContent: window.LCHComposeStyleContent,
			LCHInputLibraryD3Content: window.LCHComposeLibraryD3Content,
		}));

		d3.select('#LCHComposeComposedSample')
			.property('value', bookmarklet);

		d3.select('#LCHComposeBinary')
			.property('value', LCHCompile.LCHBookmarkletBinaryFor(bookmarklet));

		d3.select('#LCHComposeBuildLink')
			.property('href', d3.select('#LCHComposeBinary').property('value'));
	});
});
</script>
	
<div class="Container">

<p>
	<textarea id="LCHComposeComposedSample" onclick="this.select()"></textarea>
</p>

<p>
	<textarea id="LCHComposeBinary" onclick="this.select()"></textarea>
</p>

<p>
	<a id="LCHComposeBuildLink" href="#"  accesskey="r">Try it</a>
</p>

</div>

<style>
</style>
