<script>
import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';

import { storageClient, memberSelected } from './persistance.js';

let _memberSelected;
memberSelected.subscribe(function (val) {
	_memberSelected = val;
});

async function memberDelete() {
	await LCHMembersAction.LCHMembersActionCreate(storageClient, memberSelected);
	return memberSelected.set(null);
}
</script>

<div class="Container">

<header>
	<button on:click={ memberDelete }>{ window.OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }</button>
</header>
<div>
	{ (_memberSelected || {}).LCHMemberID }
</div>

</div>

<style>
</style>
