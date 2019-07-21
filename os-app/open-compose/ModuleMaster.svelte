<script>
import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';
import { LCHComposeLogicSort } from './ui-logic.js';

import { OLSKLocalized } from '../_shared/common/global.js'
import { storageClient, membersAll, memberSelected } from './persistence.js';

async function memberCreate() {
	let item = await LCHMembersAction.LCHMembersActionCreate(storageClient, {
		LCHMemberName: '',
		LCHMemberArgs: '',
		LCHMemberBody: '',
		LCHMemberSignature: '',
		LCHMemberModificationDate: new Date(),
	});

	membersAll.update(function (val) {
		return val.concat(item).sort(LCHComposeLogicSort);
	});

	return memberSelect(item);
}

async function memberSelect(inputData) {
	return memberSelected.set(inputData);
}
</script>

<div class="Container">

<header class="LCHSharedToolbar">
	<button on:click={ memberCreate } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" accesskey="n">{ OLSKLocalized('LCHComposeToolbarCreateButtonText') }</button>
</header>
<div class="List">
	{#each $membersAll as e}
		<div on:click={ () => memberSelect(e) } class="ListItem OLSKLayoutElementTappable">
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
	overflow: auto;
}

.ListItem {
	min-height: 40px;
	padding: 5px;
	border-bottom: var(--LCHBorderStyle)
}
</style>
