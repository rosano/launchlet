<script>
import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';

import { storageClient, membersAll, memberSelected } from './persistence.js';

let editorInstance;
let editorUpdateValue = function () {
	editorInstance.setValue(_memberSelected.LCHMemberBody);
}

let _memberSelected;
memberSelected.subscribe(function (val) {
	if (document.querySelector('input')) {
		document.querySelector('input').focus();
	}

	_memberSelected = val;

	if (!_memberSelected) {
		editorInstance = null;
		return;
	}

	if (!editorInstance) {
		return;
	}

	editorUpdateValue();
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
	});

	editorInstance.setValue(_memberSelected.LCHMemberBody);

	editorInstance.on('change', function (instance, changeObject) {
		if (changeObject.origin === 'setValue') {
			return;
		}

		$memberSelected.LCHMemberBody = instance.getValue();

		memberSave();
	});
});

let throttleMap = {};
import * as OLSKThrottle from '../_shared/_external/OLSKThrottle/main.js';
async function memberSave() {
	membersAll.update(function (val) {
		return val;
	});

	if (!throttleMap[_memberSelected.LCHMemberID]) {
		throttleMap[_memberSelected.LCHMemberID] = {
			OLSKThrottleDuration: 500,
			OLSKThrottleCallback: async function () {
				delete throttleMap[_memberSelected.LCHMemberID];

				await LCHMembersAction.LCHMembersActionUpdate(storageClient, _memberSelected);
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
	<div class="FormContainer">
		<p>
			<input type="text" bind:value={ _memberSelected.LCHMemberName } on:input={ memberSave } placeholder="{ window.OLSKLocalized('LCHComposeListItemFormInputNamePlaceholder') }" autofocus />
		</p>

		<span>function (</span>
		<input type="text" bind:value={ _memberSelected.LCHMemberArgs } placeholder="undefined" on:input={ memberSave } />
		<span>) &#123;</span>
		<br>
		<textarea bind:this={ editorElement }></textarea>
		<span>&#125;</span>
		<br>

		<p>
			<input type="text" bind:value={ _memberSelected.LCHMemberSignature } on:input={ memberSave } placeholder="{ window.OLSKLocalized('LCHComposeListItemFormInputSignaturePlaceholder') }" />
		</p>
	</div>
{/if}

{#if !_memberSelected}
	<div class="PlaceholderContainer">
		<span>{ window.OLSKLocalized('LCHComposeDetailPlaceholderText') }</span>
	</div>
{/if}

</div>

<style>
.Container {
	/* AppContentContainerFlexboxChild */
	flex-grow: 1;

	/* ContainerFlexboxParent */
	display: flex;
	flex-direction: column;
}

.FormContainer {
	padding: 5px;
}

p:nth-child(1) {
	margin-top: 0;
}

.FormContainer hr {
	width: 100%;
	height: 1px;
	border: none;

	background: #e6e6e6;
}

input {
	width: 50%;
	border: var(--LCHBorderStyle);
	border-radius: 5px;
	padding: 5px;
}

.FormContainer :global(.CodeMirror) {
	margin: 10px 0;

	/* CodeMirrorAdjustHeightToContent */
	height: auto;
}

.FormContainer :global(.CodeMirror-scroll) {
	/* CodeMirrorAdjustHeightToContent */
	max-height: 350px;
}

.FormContainer :global(.CodeMirror-empty) {
	color: #999999;
}

.PlaceholderContainer {
	opacity: 0.5;
	text-align: center;

	/* ContainerFlexboxChild */
	flex-grow: 1;

	/* PlaceholderContainerFlexboxParent */
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
