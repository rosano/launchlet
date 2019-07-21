<script>
import { membersAll, modelDidChange } from './persistence.js';
import * as LCHMembersModel from '../_shared/rs-modules/lch_members/model.js';
import { LCHComposeLogicBoomarkletStringFor, LCHComposeLogicBookmarkletBinaryFor } from './ui-logic.js';

let javascriptComposed, javascriptBinary = '';

import { onMount } from 'svelte';
onMount(function () {
	modelDidChange.subscribe(function (val) {
		javascriptComposed = LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_AppStyle: window.LCHComposeBookmarkletStyle,
			LCHCompileToken_AppBehaviour: window.LCHComposeBookmarkletBehaviour,
			LCHCompileToken_MemberObjects: $membersAll.filter(function (e) {
				return !!e.LCHMemberBody;
			}).map(LCHMembersModel.LCHMembersModelConvertLegacy).map(LCHMembersModel.LCHMembersModelWrappedMemberObjectFor),
			LCHCompileToken_AppLanguageCode: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});

		javascriptBinary = LCHComposeLogicBookmarkletBinaryFor(javascriptComposed);
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
