<script>
import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';

import { storageClient, membersAll, memberSelected } from './persistance.js';

let _membersAll;
membersAll.subscribe(function (val) {
	_membersAll = val;
});

async function createMember() {
	return membersAll.update(async function (val) {
		return val.concat(await LCHMembersAction.LCHMembersActionCreate(storageClient, {
			LCHMemberBody: '',
		}));
	});
}

async function selectMember(inputData) {
	return memberSelected.set(inputData);
}
</script>

<div class="Container">

<header>
	<button on:click={ createMember }>{ window.OLSKLocalized('LCHComposeToolbarAddButtonText') }</button>
</header>
<div>
	{#each _membersAll as e}
		<div on:click={ () => selectMember(e) }>{ e.LCHMemberID }</div>
	{/each}
</div>

</div>

<style>
</style>
