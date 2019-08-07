<script>
import * as LCHFormulasAction from '../_shared/rs-modules/lch_members/action.js';

import { OLSKLocalized } from '../_shared/common/global.js';
import { storageClient, membersAll, memberSelected, modelDidChange } from './persistence.js';

let editorInstance;
let editorInitializeValue = function () {
	editorInstance.setValue($memberSelected.LCHMemberBody);
	editorInstance.getDoc().clearHistory();
};

let _memberSelected;
memberSelected.subscribe(function (val) {
	if (val && (val !== _memberSelected)) {
		document.querySelector('input').focus();

		_memberSelected = val;
	}

	if (!val) {
		editorInstance = null;

		return;
	}

	if (!editorInstance) {
		return;
	}

	editorInitializeValue();
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

		placeholder: OLSKLocalized('LCHComposeListItemFormInputFunctionBodyPlaceholder'),
		
	  keyMap: 'sublime',
	});

	editorInitializeValue();

	editorInstance.on('change', function (instance, changeObject) {
		if (changeObject.origin === 'setValue') {
			return;
		}

		Object.assign($memberSelected, {
			LCHMemberBody: instance.getValue(),
		}); // @DependancySvelteIgnoresMutableChanges

		memberSave();
	});
});

let throttleMap = {};
import OLSKThrottle from 'OLSKThrottle';
async function memberSave() {
	membersAll.update(function (val) {
		return val;
	});

	modelDidChange.set(Date.now());

	if (!throttleMap[$memberSelected.LCHMemberID]) {
		throttleMap[$memberSelected.LCHMemberID] = {
			OLSKThrottleDuration: 500,
			OLSKThrottleCallback: async function () {
				console.log('callback');
				delete throttleMap[$memberSelected.LCHMemberID];

				await LCHFormulasAction.LCHFormulasActionUpdate(storageClient, $memberSelected);
			},
		};	
	}

	OLSKThrottle.OLSKThrottleTimeoutFor(throttleMap[$memberSelected.LCHMemberID]);
}

async function memberDelete() {
	if (!window.confirm(OLSKLocalized('LCHComposeListItemDeletePromptText'))) {
		return;
	}

	membersAll.update(function (val) {
		return val.filter(function(e) {
			return e !== $memberSelected;
		});
	});

	await LCHFormulasAction.LCHFormulasActionDelete(storageClient, $memberSelected.LCHMemberID);

	return memberSelected.set(null);
}
</script>

<div class="Container">

{#if $memberSelected}
	<header class="LCHSharedToolbar" id="LCHComposeDetailToolbar">
		<button on:click={ memberDelete } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" id="LCHComposeDetailToolbarDiscardButton" title={ OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }>{ OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }</button>
	</header>
	<div class="FormContainer">
		<p>
			<input type="text" bind:value={ $memberSelected.LCHMemberName } on:input={ memberSave } placeholder="{ OLSKLocalized('LCHComposeListItemFormInputNamePlaceholder') }" autofocus id="LCHComposeListItemFormInputName" />
		</p>

		<span>function (</span>
		<input type="text" bind:value={ $memberSelected.LCHMemberArgs } placeholder="undefined" on:input={ memberSave } id="LCHComposeListItemFormInputInputData" />
		<span>) &#123;</span>
		<br>
		<textarea bind:this={ editorElement }></textarea>
		<span>&#125;</span>
		<br>

		<p>
			<input type="text" bind:value={ $memberSelected.LCHMemberSignature } on:input={ memberSave } placeholder="{ OLSKLocalized('LCHComposeListItemFormInputSignaturePlaceholder') }" id="LCHComposeListItemFormInputSignature" />
		</p>

		<p>
			<input type="text" bind:value={ $memberSelected.LCHMemberURLFilter } on:input={ memberSave } placeholder="{ OLSKLocalized('LCHComposeListItemFormInputURLFilterPlaceholder') }" id="LCHComposeListItemFormInputURLFilter" />
		</p>
	</div>
{/if}

{#if !$memberSelected}
	<div class="PlaceholderContainer">
		<span>{ OLSKLocalized('LCHComposeDetailPlaceholderText') }</span>
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
	min-height: 100px;
	max-height: 350px;
}

.FormContainer :global(.CodeMirror-empty) {
	/* CodeMirrorPlaceholderText */
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
