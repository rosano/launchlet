<script>
import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';

import { storageClient, membersAll, memberSelected } from './persistence.js';

let editorInstance;

let _memberSelected;
memberSelected.subscribe(function (val) {
	if (document.querySelector('input')) {
		document.querySelector('input').focus()
	}

	_memberSelected = val;

	if (!_memberSelected) {
		editorInstance = null;
		return
	}

	if (!editorInstance) {
		return
	}

	editorInstance.setValue(_memberSelected.LCHMemberBody);
});

let editorElement;
import { afterUpdate } from 'svelte';
afterUpdate(function () {
	if (!editorElement) {
		return;
	}

	if (editorInstance) {
		return;
	}

	editorInstance = CodeMirror.fromTextArea(editorElement, {
		mode: 'javascript',

		lineNumbers: true,
		lineWrapping: true,

		placeholder: window.OLSKLocalized('LCHComposeListItemFormInputFunctionBodyPlaceholder'),
	})

	editorInstance.setValue(_memberSelected.LCHMemberBody);

	editorInstance.on('change', function (instance, changeObject) {
		if (changeObject.origin === 'setValue') {
			return;
		}

		_memberSelected.LCHMemberBody = instance.getValue();

		memberSave();
	});
});

let throttleMap = {};
import * as OLSKThrottle from '../_shared/_external/OLSKThrottle/main.js';
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

<div class="Container">

{#if _memberSelected}
	<header class="LCHSharedToolbar">
		<button on:click={ memberDelete } class="LCHSharedButtonNoStyle">{ window.OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }</button>
	</header>
	<div>
		<input type="text" bind:value={ _memberSelected.LCHMemberName } on:input={ memberSave } placeholder="{ window.OLSKLocalized('LCHComposeListItemFormInputNamePlaceholder') }" autofocus />

		<span>function (</span>
		<input type="text" bind:value={ _memberSelected.LCHMemberArgs } placeholder="undefined" on:input={ memberSave } />
		<span>) &#123;</span>
		<textarea bind:this={ editorElement }></textarea>
		<span>&#125;</span>

		<input type="text" bind:value={ _memberSelected.LCHMemberSignature } on:input={ memberSave } placeholder="{ window.OLSKLocalized('LCHComposeListItemFormInputSignaturePlaceholder') }" />
	</div>
{/if}

{#if !_memberSelected}
	<div class="PlaceholderContainer">{ window.OLSKLocalized('LCHComposeDetailPlaceholderText') }</div>
{/if}

</div>

<style>
.Container {
	/* AppContentContainerFlexboxChild */
	flex-grow: 1;

	/* ContainerFlexboxParent */
	display: flex;
}

.Container :global(.CodeMirror-empty) {
	color: #999999;
}

.PlaceholderContainer {
	width: 100%;
	
	opacity: 0.5;
	text-align: center;

	/* ContainerFlexboxChild */
	align-self: center;
}
</style>
