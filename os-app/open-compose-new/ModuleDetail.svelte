<script>
import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';
import * as OLSKThrottle from '../_shared/_external/OLSKThrottle/main.js';

import { storageClient, membersAll, memberSelected } from './persistence.js';

let throttleMap = {};

let _memberSelected;
memberSelected.subscribe(function (val) {
	if (document.querySelector('input')) {
		document.querySelector('input').focus()
	}

	_memberSelected = val;
});

async function memberSave() {
	if (!throttleMap[_memberSelected.LCHMemberID]) {
		throttleMap[_memberSelected.LCHMemberID] = {
			OLSKThrottleDuration: 500,
			OLSKThrottleCallback: async function () {
				delete throttleMap[_memberSelected.LCHMemberID];

				await LCHMembersAction.LCHMembersActionUpdate(storageClient, _memberSelected)
			},
		};	
	}

	OLSKThrottle.default.OLSKThrottleTimeoutFor(throttleMap[_memberSelected.LCHMemberID]);
}

async function memberDelete() {
	if (!window.confirm(OLSKLocalized('LCHComposeListItemDeletePromptText'))) {
		return;
	}

	membersAll.update(function (val) {
		return val.filter(function(e) {
			return e !== _memberSelected;
		});
	});

	await LCHMembersAction.LCHMembersActionDelete(storageClient, _memberSelected.LCHMemberID);

	return memberSelected.set(null);
}
</script>

<div>

{#if _memberSelected}
	<header>
		<button on:click={ memberDelete }>{ window.OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }</button>
	</header>
	<div>
		<input type="text" bind:value={ _memberSelected.LCHMemberName } on:input={ memberSave } placeholder="{ window.OLSKLocalized('LCHComposeListItemFormInputNamePlaceholder') }" autofocus />
	</div>
{/if}

{#if !_memberSelected}
	<div>
		{ window.OLSKLocalized('LCHComposeDetailPlaceholderText') }
	</div>
{/if}

</div>

<style>
</style>
