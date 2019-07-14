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

<header class="LCHSharedToolbar">
	<button on:click={ memberCreate } class="LCHSharedButtonNoStyle">{ window.OLSKLocalized('LCHComposeToolbarCreateButtonText') }</button>
</header>
<div class="List">
	{#each _membersAll as e}
		<div on:click={ () => memberSelect(e) } class="ListItem LCHSharedElementTappable">
			<strong>{ e.LCHMemberName || e.LCHMemberSignature || e.LCHMemberID }</strong>
		</div>
	{/each}
</div>

</div>

<style>
.Container {
	/* AppContentContainerFlexboxChild */
	flex-basis: 300px;
	flex-shrink: 0;

	/* ContainerFlexboxParent */
	display: flex;
	flex-direction: column;
}

.LCHSharedToolbar {
	border-right: var(--LCHBorderStyle);
}

.List {
	border-right: var(--LCHBorderStyle);

	/* ContainerFlexboxChild */
	flex-grow: 1;
}

.ListItem {
	min-height: 40px;
	padding: 5px;
	border-bottom: var(--LCHBorderStyle)
}
</style>
