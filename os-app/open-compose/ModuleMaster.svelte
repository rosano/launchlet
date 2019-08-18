<script>
import * as LCHFormulasAction from '../_shared/rs-modules/lch_documents/action.js';
import * as LCHFormulasMetal from '../_shared/rs-modules/lch_documents/metal.js';
import { LCHFormulasModelPostJSONParse } from '../_shared/rs-modules/lch_documents/model.js';
import { LCHComposeLogicSort } from './ui-logic.js';
import { OLSKLocalized } from '../_shared/common/global.js';
import { storageClient, DocumentsStore, DocumentSelectedStore } from './persistence.js';

export const DocumentsExport = function() {
	let zip = new JSZip();

	const fileName = [
		'dev.launchlet.export',
		(new Date()).toJSON(),
	].join(' ')

	zip.file(`${ fileName }.json`, JSON.stringify($DocumentsStore));
	
	zip.generateAsync({type: 'blob'}).then(function (content) {
		saveAs(content, `${ fileName }.zip`);
	});	
}

export const DocumentsImport = async function(inputData) {
	let outputData;
	try {
		outputData = JSON.parse(inputData);
	} catch (e)  {
		console.log(e);
	}

	if (!Array.isArray(outputData)) {
		return;
	};

	await Promise.all(outputData.map(function (e) {
		return LCHFormulasMetal.LCHFormulasMetalWrite(storageClient, LCHFormulasModelPostJSONParse(e))
	}));

	DocumentsStore.set(await LCHFormulasAction.LCHFormulasActionList(storageClient));
}

async function memberCreate() {
	let item = await LCHFormulasAction.LCHFormulasActionCreate(storageClient, {
		LCHDocumentName: '',
		LCHDocumentArgs: '',
		LCHDocumentBody: '',
		LCHDocumentSignature: '',
		LCHDocumentURLFilter: '',
		LCHDocumentStyle: '',
		LCHDocumentModificationDate: new Date(),
	});

	DocumentsStore.update(function (val) {
		return val.concat(item).sort(LCHComposeLogicSort);
	});

	return memberSelect(item);
}

async function memberSelect(inputData) {
	return DocumentSelectedStore.set(inputData);
}
</script>

<div class="Container">

<header class="LCHSharedToolbar">
	<button on:click={ memberCreate } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" accesskey="n" id="LCHComposeCreateButton" title={ OLSKLocalized('LCHComposeToolbarCreateButtonText') }>{ OLSKLocalized('LCHComposeToolbarCreateButtonText') }</button>
</header>
<div class="List">
	{#each $DocumentsStore as e}
		<div on:click={ () => memberSelect(e) } class="ListItem OLSKLayoutElementTappable">
			<strong>{ e.LCHDocumentName || e.LCHDocumentSignature || e.LCHDocumentID }</strong>
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
