<script>
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';

import LCHEditor from './modules/LCHEditor/main.svelte'

import * as LCHFormulasAction from '../_shared/rs-modules/lch_documents/action.js';

import { OLSKLocalized, _LCHIsTestingBehaviour } from '../_shared/common/global.js';
import { storageClient, DocumentsAllStore, DocumentSelectedStore, modelDidChange } from './persistence.js';

import { afterUpdate } from 'svelte';

let CallbackBodyEditorElement;
let CallbackBodyEditorInstance = null;
let CallbackBodyEditorPostInitializeQueue = [];
let CallbackBodyEditorConfigure = function (inputData) {
	// console.log(CallbackBodyEditorInstance ? 'run' : 'queue', inputData);
	return CallbackBodyEditorInstance ? inputData() : CallbackBodyEditorPostInitializeQueue.push(inputData);
};
afterUpdate(function SetupCallbackBodyEditor () {
	if (!CallbackBodyEditorElement) {
		return;
	}

	if (CallbackBodyEditorInstance) {
		return;
	}

	CallbackBodyEditorInstance = CodeMirror.fromTextArea(CallbackBodyEditorElement, {
		mode: 'javascript',

		lineNumbers: true,
		lineWrapping: true,

		placeholder: OLSKLocalized('LCHComposeFormScriptFieldPlaceholderText'),
		
	  keyMap: 'sublime',

		extraKeys: {
			Tab: false,
		},
	});

	CallbackBodyEditorInstance.on('change', function (instance, changeObject) {
		if (changeObject.origin === 'setValue') {
			return;
		}

		Object.assign($DocumentSelectedStore, {
			LCHDocumentBody: instance.getValue(),
		}); // @DependancySvelteIgnoresMutableChanges

		mod.commandDocumentSave();
	});

	// console.log(CallbackBodyEditorPostInitializeQueue);
	
	CallbackBodyEditorPostInitializeQueue.splice(0, CallbackBodyEditorPostInitializeQueue.length).forEach(function(e) {
		// console.log('run', e);

		return e(CallbackBodyEditorInstance);
	});
});

let StyleEditorElement;
let StyleEditorInstance = null;
let StyleEditorPostInitializeQueue = [];
let StyleEditorConfigure = function (inputData) {
	// console.log(StyleEditorInstance ? 'run' : 'queue', inputData);
	return StyleEditorInstance ? inputData() : StyleEditorPostInitializeQueue.push(inputData);
};
afterUpdate(function SetupStyleEditor () {
	if (!StyleEditorElement) {
		return;
	}

	if (StyleEditorInstance) {
		return;
	}

	StyleEditorInstance = CodeMirror.fromTextArea(StyleEditorElement, {
		mode: 'css',

		lineNumbers: true,
		lineWrapping: true,

		placeholder: OLSKLocalized('LCHComposeFormStyleFieldPlaceholderText'),
		
	  keyMap: 'sublime',

		extraKeys: {
			Tab: false,
		},
	});

	StyleEditorInstance.on('change', function (instance, changeObject) {
		if (changeObject.origin === 'setValue') {
			return;
		}

		Object.assign($DocumentSelectedStore, {
			LCHDocumentStyle: instance.getValue(),
		}); // @DependancySvelteIgnoresMutableChanges

		mod.commandDocumentSave();
	});

	// console.log(StyleEditorPostInitializeQueue);
	
	StyleEditorPostInitializeQueue.splice(0, StyleEditorPostInitializeQueue.length).forEach(function(e) {
		// console.log('run', e);

		return e(StyleEditorInstance);
	});
});

let _DocumentSelected;
DocumentSelectedStore.subscribe(function (val) {
	if (val && (val !== _DocumentSelected)) {
		setTimeout(function () {
			document.querySelector('#LCHComposeFormNameField').focus();
		})

		_DocumentSelected = val;
	}

	if (!val && CallbackBodyEditorInstance) {
		CallbackBodyEditorInstance.toTextArea();
		CallbackBodyEditorInstance = null;
	}

	if (!val && StyleEditorInstance) {
		StyleEditorInstance.toTextArea();
		StyleEditorInstance = null;
	}

	if (!val) {
		return;
	}

	CallbackBodyEditorConfigure(function () {
		if (_LCHIsTestingBehaviour()) {
			return document.querySelector('#LCHComposeDetailCallbackBodyInputDebug').value = val.LCHDocumentBody;
		}

		CallbackBodyEditorInstance.setValue(val.LCHDocumentBody);
		CallbackBodyEditorInstance.getDoc().clearHistory();
	});

	StyleEditorConfigure(function () {
		if (_LCHIsTestingBehaviour()) {
			return document.querySelector('#LCHComposeDetailStyleInputDebug').value = val.LCHDocumentStyle;
		}

		StyleEditorInstance.setValue(val.LCHDocumentStyle);
		StyleEditorInstance.getDoc().clearHistory();
	});
});

let throttleMap = {};
import OLSKThrottle from 'OLSKThrottle';
const mod = {

	_EditorDispatchValueChanged(inputData) {
		Object.assign($DocumentSelectedStore, inputData); // @DependancySvelteIgnoresMutableChanges

		mod.commandDocumentSave();
	},

	// COMMAND

	async commandDocumentSave() {
		DocumentsAllStore.update(function (val) {
			return val;
		});

		if (!throttleMap[$DocumentSelectedStore.LCHDocumentID]) {
			throttleMap[$DocumentSelectedStore.LCHDocumentID] = {
				OLSKThrottleDuration: 500,
				OLSKThrottleCallback: async function () {
					delete throttleMap[$DocumentSelectedStore.LCHDocumentID];

					await LCHFormulasAction.LCHFormulasActionUpdate(storageClient, $DocumentSelectedStore);

					modelDidChange.set(Date.now());
				},
			};	
		}

		OLSKThrottle.OLSKThrottleTimeoutFor(throttleMap[$DocumentSelectedStore.LCHDocumentID]);
	},
	async commandDocumentDelete() {
		if (!window.confirm(OLSKLocalized('LCHComposeListItemDeletePromptText'))) {
			return;
		}

		DocumentsAllStore.update(function (val) {
			return val.filter(function(e) {
				return e !== $DocumentSelectedStore;
			});
		});

		await LCHFormulasAction.LCHFormulasActionDelete(storageClient, $DocumentSelectedStore.LCHDocumentID);

		return DocumentSelectedStore.set(null);
	},

};
</script>

<div class="Container OLSKViewportDetail">

{#if $DocumentSelectedStore}
<header id="LCHComposeDetailToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button on:click={ mod.commandDocumentDelete } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" id="LCHComposeDetailToolbarDiscardButton" title={ OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }>{ OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="FormContainer">
	<p>
		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentName } on:input={ mod.commandDocumentSave } placeholder="{ OLSKLocalized('LCHComposeFormNameFieldPlaceholderText') }" autofocus id="LCHComposeFormNameField" />
	</p>

	<hr>	

	<p>
		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentSignature } on:input={ mod.commandDocumentSave } placeholder="{ OLSKLocalized('LCHComposeFormSignatureFieldPlaceholderText') }" id="LCHComposeFormSignatureField" />
	</p>

	<p>
		<span>function</span>

		{#if $DocumentSelectedStore.LCHDocumentArgs }
			<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentInputTypes } placeholder={ OLSKLocalized('LCHComposeFormInputTypesFieldPlaceholderText') } on:input={ mod.commandDocumentSave } id="LCHComposeFormInputTypesField" />
			<span>→</span>
		{/if}
		
		<span>(</span>
		
		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentArgs } placeholder="undefined" on:input={ mod.commandDocumentSave } id="LCHComposeFormArgsField" />
		
		<span>) &#123;</span>
	</p>

	<p class="LCHComposeDetailCallbackBody">
		{#if _LCHIsTestingBehaviour()}
			<textarea bind:value={ $DocumentSelectedStore.LCHDocumentBody } on:input={ mod.commandDocumentSave } id="LCHComposeDetailCallbackBodyInputDebug"></textarea>
		{/if}

		<textarea bind:this={ CallbackBodyEditorElement }></textarea>

		<span>&#125;</span>

		<span>→</span>

		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentOutputType } placeholder={ OLSKLocalized('LCHComposeFormOutputTypeFieldPlaceholderText') } on:input={ mod.commandDocumentSave } id="LCHComposeFormOutputTypeField" />	
	</p>

	{#if $DocumentSelectedStore.LCHDocumentOutputType === 'Bool'}
		<p class="LCHComposeFormOutputTypeCanonicalExampleBody">
			{#if _LCHIsTestingBehaviour()}
				<textarea bind:value={ $DocumentSelectedStore.LCHDocumentOutputTypeCanonicalExampleBody } on:input={ mod.commandDocumentSave } id="LCHComposeFormOutputTypeCanonicalExampleBodyDebugField"></textarea>
			{/if}

			<LCHEditor EditorOptions={ {
				mode: 'javascript',

				lineNumbers: true,
				lineWrapping: true,

				placeholder: OLSKLocalized('LCHComposeFormScriptFieldPlaceholderText'),
				
			  keyMap: 'sublime',

				extraKeys: {
					Tab: false,
				},
			} } on:EditorDispatchValueChanged={ (event) => mod._EditorDispatchValueChanged({
			LCHDocumentOutputTypeCanonicalExampleBody: event.detail,
		}) } EditorInitialValue={ $DocumentSelectedStore.LCHDocumentOutputTypeCanonicalExampleBody } />
		</p>
	{/if}

	<hr>

	<div class="LCHComposeDetailStyle">
		{#if _LCHIsTestingBehaviour()}
			<textarea bind:value={ $DocumentSelectedStore.LCHDocumentStyle } on:input={ mod.commandDocumentSave } id="LCHComposeDetailStyleInputDebug"></textarea>
		{/if}
		<textarea bind:this={ StyleEditorElement }></textarea>
	</div>

	<hr>

	<p>
		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentURLFilter } on:input={ mod.commandDocumentSave } placeholder="{ OLSKLocalized('LCHComposeFormURLFilterFieldPlaceholderText') }" id="LCHComposeFormURLFilterField" />
	</p>

	{#if $DocumentSelectedStore.LCHDocumentURLFilter }
		<p>
			<input type="checkbox" bind:checked={ $DocumentSelectedStore.LCHDocumentIsAutomatic } on:input={ mod.commandDocumentSave } id="LCHComposeFormIsAutomaticField" />
			<label for="LCHComposeFormIsAutomaticField">{ OLSKLocalized('LCHComposeFormIsAutomaticFieldLabelText') }</label>
		</p>
	{/if}
</div>
{/if}

{#if !$DocumentSelectedStore}
<div class="PlaceholderContainer">
	<span>{ OLSKLocalized('LCHComposeDetailPlaceholderText') }</span>
</div>
{/if}

</div>

<style>
.Container {
	/* ContainerFlexboxParent */
	display: flex;
	flex-direction: column;
}

header {
	border-bottom: var(--LCHBorderStyle);
}

.FormContainer {
	padding: 5px;

	overflow-y: scroll;
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

input[type=text] {
	width: 50%;
	border: var(--LCHBorderStyle);
	border-radius: 5px;
	padding: 5px;
}

#LCHComposeFormArgsField {
	max-width: 60px;
}

#LCHComposeFormInputTypesField {
	max-width: 120px;
}

#LCHComposeFormOutputTypeField {
	max-width: 140px;
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
