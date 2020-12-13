<script>
export let LCHComposeInputItem;
export let LCHComposeInputKey;
export let LCHComposeInputOptions;
export let LCHComposeInputDispatchUpdate;

export const modPublic = {

	LCHComposeInputFocus () {
		mod.ControlConfigureEditor(function (inputData) {
			inputData.focus();
		});
	},

	LCHComposeInputSetCursor (param1, param2) {
		mod.ControlConfigureEditor(function (inputData) {
			inputData.setCursor(CodeMirror.Pos(param1, param2));
		});
	},

	LCHComposeInputScrollIntoView (param1, param2) {
		mod.ControlConfigureEditor(function (inputData) {
			inputData.scrollIntoView(CodeMirror.Pos(param1, param2), 300);
		});
	},

	LCHComposeInputSetSelection (param1, param2, param3, param4) {
		mod.ControlConfigureEditor(function (inputData) {
			inputData.setSelection(CodeMirror.Pos(param1, param2), CodeMirror.Pos(param3, param4));
		});
	},

};

import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	// VALUE

	_ValueEditorElement: undefined,

	_ValueEditorInstance: undefined,

	_ValueEditorPostInitializeQueue: [],
	
	// INTERFACE

	InterfaceEditorFieldDebugDidInput () {
		LCHComposeInputDispatchUpdate();
	},

	// CONTROL

	ControlConfigureEditor (inputData) {
		if (OLSK_SPEC_UI()) {
			return;
		}
		
		if (mod._ValueEditorInstance) {
			return inputData(mod._ValueEditorInstance);
		};

		mod._ValueEditorPostInitializeQueue.push(inputData);
	},

	// SETUP

	SetupEverything () {
		mod.SetupEditor();
	},

	SetupEditor () {
		if (OLSK_SPEC_UI()) {
 			return;
		}

		mod._ValueEditorInstance = CodeMirror.fromTextArea(mod._ValueEditorElement, LCHComposeInputOptions);

		if (window.OLSK_DEMO && !window.OLSKDemoEditor) {
			window.OLSKDemoEditor = mod._ValueEditorInstance;
		}

		mod._ValueEditorInstance.on('change', function (instance, changeObject) {
			if (changeObject.origin === 'setValue' && !window.OLSK_DEMO) {
				return;
			}

			LCHComposeInputItem[LCHComposeInputKey] = instance.getValue();

			LCHComposeInputDispatchUpdate();
		});

		mod._ValueEditorPostInitializeQueue.splice(0, mod._ValueEditorPostInitializeQueue.length).forEach(function(e) {
			return e(mod._ValueEditorInstance);
		});

		mod._ValueEditorInstance.setValue(LCHComposeInputItem[LCHComposeInputKey]);
	},

	// LIFECYCLE

	LifecycleComponentDidMount () {
		mod.SetupEverything();
	},

};

let __PreviousItem;
const __MessageItemDidChange = function (inputData) {
	if (!mod._ValueEditorInstance) {
		__PreviousItem = inputData;

		return;
	}

	if (__PreviousItem === inputData) {
		return;
	}

	__PreviousItem = inputData;

	mod._ValueEditorInstance.setValue(LCHComposeInputItem[LCHComposeInputKey]);
	mod._ValueEditorInstance.getDoc().clearHistory();
};

$: {
	__MessageItemDidChange(LCHComposeInputItem)
};

import { onMount } from 'svelte';
onMount(mod.LifecycleComponentDidMount);
</script>
<svelte:options accessors />

<div class="LCHComposeInput">
	{#if OLSK_SPEC_UI()}
		<textarea class="LCHComposeInputFieldDebug" bind:value={ LCHComposeInputItem[LCHComposeInputKey] } on:input={ mod.InterfaceEditorFieldDebugDidInput }></textarea>
	{/if}
	
	{#if !OLSK_SPEC_UI()}
		<textarea bind:this={ mod._ValueEditorElement }></textarea>
	{/if}
</div>
