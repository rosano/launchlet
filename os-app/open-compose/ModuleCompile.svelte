<script>
import { membersAll, modelDidChange } from './persistence.js';
import * as LCHMembersModel from '../_shared/rs-modules/lch_members/model.js';
import LCHCompile from '../open-pendext/main.js';

let javascriptComposed, javascriptBinary = '';

import { onMount } from 'svelte';
onMount(function () {
	modelDidChange.subscribe(function (val) {
		javascriptComposed = LCHCompile.LCHBookmarkletTextForTokenHashNew(LCHCompile.LCHTokenHashForNew({
			LCHInputMemberObjects: $membersAll.filter(function (e) {
				return !!e.LCHMemberBody;
			}).map(LCHMembersModel.LCHMembersModelConvertLegacy).map(LCHCompile.LCHWrappedMemberObjectFor),
			LCHInputAppBehaviour: window.LCHComposeBookmarkletBehaviour.replace(`//# sourceMappingURL=ui-behaviour.js.map`, ''),
			LCHInputAppStyle: window.LCHComposeBookmarkletStyle,
		}));

		javascriptBinary = LCHCompile.LCHBookmarkletBinaryFor(javascriptComposed);
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
