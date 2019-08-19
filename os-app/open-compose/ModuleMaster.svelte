<script>
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';

import * as LCHFormulasAction from '../_shared/rs-modules/lch_documents/action.js';
import * as LCHFormulasMetal from '../_shared/rs-modules/lch_documents/metal.js';
import { LCHFormulasModelPostJSONParse } from '../_shared/rs-modules/lch_documents/model.js';
import { LCHComposeLogicSort } from './ui-logic.js';
import { OLSKLocalized } from '../_shared/common/global.js';
import { storageClient, DocumentsAllStore, DocumentSelectedStore } from './persistence.js';

export const DocumentsExport = function() {
	let zip = new JSZip();

	const fileName = [
		'dev.launchlet.export',
		(new Date()).toJSON(),
	].join(' ')

	zip.file(`${ fileName }.json`, JSON.stringify($DocumentsAllStore));
	
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

	DocumentsAllStore.set(await LCHFormulasAction.LCHFormulasActionList(storageClient));
}

const mod = {
	async commandDocumentCreate() {
		let item = await LCHFormulasAction.LCHFormulasActionCreate(storageClient, {
			LCHDocumentName: '',
			LCHDocumentArgs: '',
			LCHDocumentBody: '',
			LCHDocumentSignature: '',
			LCHDocumentURLFilter: '',
			LCHDocumentStyle: '',
			LCHDocumentModificationDate: new Date(),
		});

		DocumentsAllStore.update(function (val) {
			return val.concat(item).sort(LCHComposeLogicSort);
		});

		return mod.commandDocumentSelect(item);
	},
	commandDocumentSelect(inputData) {
		return DocumentSelectedStore.set(inputData);
	}
}
</script>

<div class="Container OLSKViewportMaster">

<header>
	<OLSKToolbar>
		<OLSKToolbarElementGroup>
			<button on:click={ mod.commandDocumentCreate } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" accesskey="n" id="LCHComposeCreateButton" title={ OLSKLocalized('LCHComposeToolbarCreateButtonText') }>{ OLSKLocalized('LCHComposeToolbarCreateButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="List">
	{#each $DocumentsAllStore as e}
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
