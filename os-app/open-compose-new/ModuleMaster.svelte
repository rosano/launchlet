<script>
import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';

import { storageClient, membersAll, memberSelected } from './persistence.js';

let _membersAll;
membersAll.subscribe(function (val) {
	_membersAll = val;
});

async function memberCreate() {
	let item = await LCHMembersAction.LCHMembersActionCreate(storageClient, {
		LCHMemberName: '',
		LCHMemberArgs: '',
		LCHMemberBody: '',
		LCHMemberSignature: '',
	});

	membersAll.update(function (val) {
		return val.concat(item);
	});

	return memberSelect(item)
}

async function memberSelect(inputData) {
	return memberSelected.set(inputData);
}
</script>

<div class="Container">

<header>
	<button on:click={ memberCreate } class="LCHSharedButtonNoStyle">{ window.OLSKLocalized('LCHComposeToolbarCreateButtonText') }</button>
</header>
<div>
	{#each _membersAll as e}
		<div on:click={ () => memberSelect(e) } class="LCHSharedElementTappable">{ e.LCHMemberID }</div>
	{/each}
</div>

</div>

<style>
</style>
