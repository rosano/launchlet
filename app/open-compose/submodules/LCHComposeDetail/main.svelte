<script>
import * as LCHDocumentAction from '../../../_shared/LCHDocument/action.js';

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

import { storageClient, DocumentsAllStore, DocumentSelectedStore } from '../../persistence.js';
import { modelDidChange } from '../../model.js'
import { LCHComposeSort } from '../../ui-logic.js';
import { LCHFlags } from '../../../_shared/LCHFlags/main.js'
import { LCHFormulaFrom, LCHFormulaToEvaluate } from '../../../_shared/LCHFormula/main.js'

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
			LCHDocumentCallbackBody: instance.getValue(),
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
		});

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
		if (OLSK_TESTING_BEHAVIOUR()) {
			return document.querySelector('#LCHComposeDetailCallbackBodyInputDebug').value = val.LCHDocumentCallbackBody;
		}

		CallbackBodyEditorInstance.setValue(val.LCHDocumentCallbackBody);
		CallbackBodyEditorInstance.getDoc().clearHistory();
	});

	StyleEditorConfigure(function () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			return document.querySelector('#LCHComposeDetailStyleInputDebug').value = val.LCHDocumentStyle;
		}

		StyleEditorInstance.setValue(val.LCHDocumentStyle);
		StyleEditorInstance.getDoc().clearHistory();
	});
});

import OLSKThrottle from 'OLSKThrottle';
const mod = {

	_EditorDispatchValueChanged(inputData) {
		Object.assign($DocumentSelectedStore, inputData); // @DependancySvelteIgnoresMutableChanges

		mod.commandDocumentSave();
	},

// COMMAND

	_ReactThrottleMap: {},
	_SaveThrottleMap: {},
	commandDocumentSave() {
		DocumentsAllStore.update(function (val) {
			return val;
		});

		if (OLSK_TESTING_BEHAVIOUR() && $DocumentSelectedStore.LCHDocumentCallbackBody === 'LCH_TEST_FLAG_ON_BUILD') {
			Object.assign($DocumentSelectedStore, {
				LCHDocumentCallbackBody: 'eval',
			});
		};

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(mod._ReactThrottleMap, 'Default', function (inputData) {
			return {
				OLSKThrottleDuration: 500,
				OLSKThrottleCallback: function () {
					try	{
						mod.commandFlagDocument(inputData)
					} catch (e) {
						if (!e.name.match('SyntaxError')) {
							throw e
						}

						Object.assign(inputData, {
							LCHDocumentIsFlagged: true,
							LCHDocumentSyntaxErrorMessage: e.message,
						});

						if (inputData === $DocumentSelectedStore) {
							// causes reload of codemirror
							// $DocumentSelectedStore.LCHDocumentIsFlagged = inputData.LCHDocumentIsFlagged;
						};
					}

					DocumentsAllStore.update(function (val) {
						return val;
					});

					modelDidChange.set(Date.now());
				},
			};
		}, $DocumentSelectedStore);

		if (OLSK_TESTING_BEHAVIOUR()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ReactThrottleMap['Default'])	
		};

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(mod._SaveThrottleMap, $DocumentSelectedStore.LCHDocumentID, function (inputData) {
			return {
				OLSKThrottleDuration: 500,
				OLSKThrottleCallback: async function () {
					delete mod._SaveThrottleMap[inputData.LCHDocumentID];

					await LCHDocumentAction.LCHDocumentActionUpdate(storageClient, inputData);
				},
			};
		}, $DocumentSelectedStore);

		if (OLSK_TESTING_BEHAVIOUR()) {
			OLSKThrottle.OLSKThrottleSkip(mod._SaveThrottleMap[$DocumentSelectedStore.LCHDocumentID])	
		};
	},
	async commandDocumentClone() {
		let item = await LCHDocumentAction.LCHDocumentActionCreate(storageClient, Object.assign(Object.assign({}, $DocumentSelectedStore), {
			LCHDocumentID: undefined,
		}));

		DocumentsAllStore.update(function (val) {
			return val.concat(item).sort(LCHComposeSort);
		});

		// return mod.commandDocumentSelect(item);
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

		await LCHDocumentAction.LCHDocumentActionDelete(storageClient, $DocumentSelectedStore.LCHDocumentID);

		return DocumentSelectedStore.set(null);
	},

	commandFlagDocument(inputData) {
		Object.assign($DocumentSelectedStore, {
			LCHDocumentIsFlagged: !!LCHFlags(LCHFormulaToEvaluate(LCHFormulaFrom(inputData))),
			LCHDocumentSyntaxErrorMessage: '',
		})
	},

};
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';

import LCHEditor from '../LCHEditor/main.svelte';
</script>

<div class="Container OLSKViewportDetail">

{#if $DocumentSelectedStore}
<header id="LCHComposeDetailToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button on:click={ mod.commandDocumentClone } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" id="LCHComposeDetailToolbarCloneButton" title={ OLSKLocalized('LCHComposeListItemToolbarCloneButtonText') }>{ OLSKLocalized('LCHComposeListItemToolbarCloneButtonText') }</button>
			<button on:click={ mod.commandDocumentDelete } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" id="LCHComposeDetailToolbarDiscardButton" title={ OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }>{ OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="FormContainer">
	{#if $DocumentSelectedStore.LCHDocumentIsFlagged}
		<div class="LCHComposeFormFlagAlert">{ $DocumentSelectedStore.LCHDocumentSyntaxErrorMessage ? $DocumentSelectedStore.LCHDocumentSyntaxErrorMessage : OLSKLocalized('LCHComposeFormFlagAlertText') }</div>
	{/if}
	
	<p>
		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentName } on:input={ mod.commandDocumentSave } placeholder="{ OLSKLocalized('LCHComposeFormNameFieldPlaceholderText') }" autofocus id="LCHComposeFormNameField" />
	</p>

	<hr>	

	<p>
		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentSignature } on:input={ mod.commandDocumentSave } placeholder="{ OLSKLocalized('LCHComposeFormSignatureFieldPlaceholderText') }" id="LCHComposeFormSignatureField" />
	</p>

	<p>
		<span>function</span>

		{#if $DocumentSelectedStore.LCHDocumentCallbackArgs }
			<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentInputTypes } placeholder={ OLSKLocalized('LCHComposeFormInputTypesFieldPlaceholderText') } on:input={ mod.commandDocumentSave } id="LCHComposeFormInputTypesField" />
			<span>→</span>
		{/if}
		
		<span>(</span>
		
		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentCallbackArgs } placeholder="undefined" on:input={ mod.commandDocumentSave } id="LCHComposeFormArgsField" />
		
		<span>) &#123;</span>
	</p>

	<p class="LCHComposeDetailCallbackBody">
		{#if OLSK_TESTING_BEHAVIOUR()}
			<textarea bind:value={ $DocumentSelectedStore.LCHDocumentCallbackBody } on:input={ mod.commandDocumentSave } id="LCHComposeDetailCallbackBodyInputDebug"></textarea>
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
		LCHDocumentCallbackBody: event.detail,
	}) } EditorInitialValue={ $DocumentSelectedStore.LCHDocumentCallbackBody } />

		<span>&#125;</span>

		<span>→</span>

		<input type="text" bind:value={ $DocumentSelectedStore.LCHDocumentOutputType } placeholder={ OLSKLocalized('LCHComposeFormOutputTypeFieldPlaceholderText') } on:input={ mod.commandDocumentSave } id="LCHComposeFormOutputTypeField" />	
	</p>

	{#if $DocumentSelectedStore.LCHDocumentOutputType === 'Bool'}
		<p class="LCHComposeFormCanonicalExampleBody">
			{#if OLSK_TESTING_BEHAVIOUR()}
				<textarea bind:value={ $DocumentSelectedStore.LCHDocumentCanonicalExampleCallbackBody } on:input={ mod.commandDocumentSave } id="LCHComposeFormCanonicalExampleBodyDebugField"></textarea>
			{/if}

			<LCHEditor EditorOptions={ {
				mode: 'javascript',

				lineNumbers: true,
				lineWrapping: true,

				placeholder: OLSKLocalized('LCHComposeFormCanonicalExampleBodyFieldPlaceholderText'),
				
			  keyMap: 'sublime',

				extraKeys: {
					Tab: false,
				},
			} } on:EditorDispatchValueChanged={ (event) => mod._EditorDispatchValueChanged({
			LCHDocumentCanonicalExampleCallbackBody: event.detail,
		}) } EditorInitialValue={ $DocumentSelectedStore.LCHDocumentCanonicalExampleCallbackBody } />
		</p>
	{/if}

	<hr>

	<div class="LCHComposeDetailStyle">
		{#if OLSK_TESTING_BEHAVIOUR()}
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

<style src="./ui-style.css"></style>
