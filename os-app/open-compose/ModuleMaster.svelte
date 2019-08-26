<script>
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';

import { LCHComposeDefaultFocusNode } from './_shared.js';

import * as LCHDocumentAction from '../_shared/LCHDocument/action.js';
import * as LCHDocumentMetal from '../_shared/LCHDocument/metal.js';
import { LCHDocumentModelPostJSONParse } from '../_shared/LCHDocument/model.js';
import { LCHComposeFilterFunction, LCHComposeSort } from './ui-logic.js';
import { OLSKLocalized } from '../_shared/common/global.js';
import { storageClient, DocumentsAllStore, DocumentSelectedStore } from './persistence.js';

import { writable } from 'svelte/store';
import OLSKInputWrapper from 'OLSKInputWrapper';
let FilterInputTextStore = writable('');

export const DocumentsExport = function() {
	let zip = new JSZip();

	const fileName = [
		'dev.launchlet.export',
		(new Date()).toJSON(),
	].join(' ');

	zip.file(`${ fileName }.json`, JSON.stringify($DocumentsAllStore));
	
	zip.generateAsync({type: 'blob'}).then(function (content) {
		saveAs(content, `${ fileName }.zip`);
	});	
};

export const DocumentsImport = async function(inputData) {
	let outputData;
	try {
		outputData = JSON.parse(inputData);
	} catch (e)  {
		console.log(e);
	}

	if (!Array.isArray(outputData)) {
		return;
	}

	await Promise.all(outputData.map(function (e) {
		return LCHDocumentMetal.LCHDocumentMetalWrite(storageClient, LCHDocumentModelPostJSONParse(e));
	}));

	DocumentsAllStore.set(await LCHDocumentAction.LCHDocumentActionList(storageClient));
};

let _DocumentsVisible = [];
const mod = {
	FilterInputDispatchClear() {
		mod.valueFilterInputText('');
		
		LCHComposeDefaultFocusNode().focus();
	},

	// VALUE

	valueFilterInputText(inputData) {
		if (typeof inputData === 'undefined') {
			return $FilterInputTextStore;
		}

		FilterInputTextStore.set(inputData);
	},

	// INTERFACE

	interfaceDidKeydown(event) {
		if (event.key !== 'Escape') {
			return;
		}

		mod.valueFilterInputText('');

		LCHComposeDefaultFocusNode().focus();
	},

	// COMMAND

	async commandDocumentCreate() {
		let item = await LCHDocumentAction.LCHDocumentActionCreate(storageClient, {
			LCHDocumentName: '',
			LCHDocumentInputTypes: '',
			LCHDocumentArgs: '',
			LCHDocumentBody: '',
			LCHDocumentOutputType: '',
			LCHDocumentOutputTypeCanonicalExampleBody: '',
			LCHDocumentSignature: '',
			LCHDocumentURLFilter: '',
			LCHDocumentStyle: '',
			LCHDocumentModificationDate: new Date(),
		});

		DocumentsAllStore.update(function (val) {
			return val.concat(item).sort(LCHComposeSort);
		});

		return mod.commandDocumentSelect(item);
	},
	commandDocumentSelect(inputData) {
		return DocumentSelectedStore.set(inputData);
	},

	// REACT

	reactDocumentsVisible() {
		if (!$FilterInputTextStore) {
			return _DocumentsVisible = $DocumentsAllStore;
		}

		_DocumentsVisible = $DocumentsAllStore.filter(LCHComposeFilterFunction($FilterInputTextStore));
	},

	// LIFECYCLE

	lifecycleComponentDidMount() {
		setTimeout(function () {
			LCHComposeDefaultFocusNode().focus();
		}, 200);
	},
};

import { onMount } from 'svelte';
onMount(mod.lifecycleComponentDidMount);

FilterInputTextStore.subscribe(mod.reactDocumentsVisible);
DocumentsAllStore.subscribe(mod.reactDocumentsVisible);
</script>
<svelte:window on:keydown={ mod.interfaceDidKeydown }/>

<div class="Container OLSKViewportMaster">

<header>
	<OLSKToolbar>
		<OLSKInputWrapper bind:InputWrapperValue={ $FilterInputTextStore } on:InputWrapperDispatchClear={ mod.FilterInputDispatchClear } OLSKLocalized={ OLSKLocalized }>
			<input bind:value={ $FilterInputTextStore } class="LCHComposeFilterInput" placeholder={ OLSKLocalized('LCHComposeFilterInputPlaceholderText') } />
		</OLSKInputWrapper>

		<OLSKToolbarElementGroup>
			<button on:click={ mod.commandDocumentCreate } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" accesskey="n" id="LCHComposeCreateButton" title={ OLSKLocalized('LCHComposeToolbarCreateButtonText') }>{ OLSKLocalized('LCHComposeToolbarCreateButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="List">
	{#each _DocumentsVisible as e}
		<div on:click={ () => mod.commandDocumentSelect(e) } class="ListItem OLSKLayoutElementTappable">
			<strong>{ e.LCHDocumentName || e.LCHDocumentSignature || e.LCHDocumentID }</strong>
		</div>
	{/each}
</div>

</div>

<style>
.Container {
	border-right: var(--LCHBorderStyle);

	/* ContainerFlexboxParent */
	display: flex;
	flex-direction: column;
}

header {
	border-bottom: var(--LCHBorderStyle);
}

.List {
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
