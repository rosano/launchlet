<script>
export let LCHComposeDetailItem;
export let LCHComposeDetailDispatchBack;
export let LCHComposeDetailDispatchClone;
export let LCHComposeDetailDispatchDiscard;
export let LCHComposeDetailDispatchUpdate;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedClone from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedClone.svg';
import _OLSKSharedDiscard from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedDiscard.svg';
import LCHComposeInput from '../LCHComposeInput/main.svelte';
</script>

<div class="LCHComposeDetail ROCOStandardView">

<header class="LCHComposeDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeBottom OLSKMobileViewHeader ROCOStandardViewHead">
	<div class="OLSKToolbarElementGroup">
		<button class="LCHComposeDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile" title={ OLSKLocalized('LCHComposeDetailToolbarBackButtonText') } on:click={ LCHComposeDetailDispatchBack }>
			<div class="LCHComposeDetailToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="LCHComposeDetailToolbarCloneButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('LCHComposeDetailToolbarCloneButtonText') } on:click={ LCHComposeDetailDispatchClone }>
			<div class="LCHComposeDetailToolbarCloneButtonImage">{@html _OLSKSharedClone }</div>
		</button>
		<button class="LCHComposeDetailToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('LCHComposeDetailToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('OLSKWordingConfirmText')) && LCHComposeDetailDispatchDiscard() }>
			<div class="LCHComposeDetailToolbarDiscardButtonImage">{@html _OLSKSharedDiscard }</div>
		</button>
	</div>
</header>

<div class="LCHComposeDetailForm OLSKDecor OLSKDecorBigForm ROCOStandardViewBody">

{#if LCHComposeDetailItem.LCHDocumentIsFlagged}
	<div class="LCHComposeDetailFlagAlert">{ LCHComposeDetailItem.LCHDocumentSyntaxErrorMessage || OLSKLocalized('LCHComposeDetailFlagAlertText') }</div>
{/if}

<p>
	<input class="LCHComposeDetailFormNameField" placeholder="{ OLSKLocalized('LCHComposeDetailFormNameFieldText') }" type="text" bind:value={ LCHComposeDetailItem.LCHDocumentName } on:input={ LCHComposeDetailDispatchUpdate } />
</p>

<p>
	<input class="LCHComposeDetailFormSignatureField" placeholder="{ OLSKLocalized('LCHComposeDetailFormSignatureFieldText') }" type="text" bind:value={ LCHComposeDetailItem.LCHDocumentSignature } on:input={ LCHComposeDetailDispatchUpdate } />
</p>

<p>
	<span>function</span>

	{#if LCHComposeDetailItem.LCHDocumentCallbackArgs }
		<input class="LCHComposeDetailFormInputTypesField" placeholder="{ OLSKLocalized('LCHComposeDetailFormInputTypesFieldText') }" type="text" bind:value={ LCHComposeDetailItem.LCHDocumentInputTypes } on:input={ LCHComposeDetailDispatchUpdate } />
		<span>→</span>
	{/if}
	
	<span>(</span>
	
	<input class="LCHComposeDetailFormCallbackArgsField" placeholder="{ OLSKLocalized('LCHComposeDetailFormCallbackArgsFieldText') }" type="text" bind:value={ LCHComposeDetailItem.LCHDocumentCallbackArgs } on:input={ LCHComposeDetailDispatchUpdate } />
	
	<span>) &#123;</span>
</p>

<p class="LCHComposeDetailFormCallbackBody">
	<LCHComposeInput
		LCHComposeInputItem={ LCHComposeDetailItem }
		LCHComposeInputKey={ 'LCHDocumentCallbackBody' }
		LCHComposeInputOptions={ {
			mode: 'javascript',

			lineNumbers: true,
			lineWrapping: true,

			placeholder: OLSKLocalized('LCHComposeDetailFormCallbackBodyFieldText'),
			
		  keyMap: 'sublime',

			extraKeys: {
				Tab: false,
			},
		} }
		LCHComposeInputDispatchUpdate={ LCHComposeDetailDispatchUpdate }
		/>

		<span>&#125;</span>

		<span>→</span>

		<input class="LCHComposeDetailFormOutputTypeField" placeholder="{ OLSKLocalized('LCHComposeDetailFormOutputTypeFieldText') }" type="text" bind:value={ LCHComposeDetailItem.LCHDocumentOutputType } on:input={ LCHComposeDetailDispatchUpdate } />
</p>

{#if LCHComposeDetailItem.LCHDocumentOutputType === 'Bool'}
	<p class="LCHComposeDetailFormCanonicalExampleCallbackBody">
		<LCHComposeInput
			LCHComposeInputItem={ LCHComposeDetailItem }
			LCHComposeInputKey={ 'LCHDocumentCanonicalExampleCallbackBody' }
			LCHComposeInputOptions={ {
				mode: 'javascript',

				lineNumbers: true,
				lineWrapping: true,

				placeholder: OLSKLocalized('LCHComposeDetailFormCanonicalExampleCallbackBodyFieldText'),
				
			  keyMap: 'sublime',

				extraKeys: {
					Tab: false,
				},
			} }
			LCHComposeInputDispatchUpdate={ LCHComposeDetailDispatchUpdate }
			/>
	</p>
{/if}

<hr role="presentation" />

<p class="LCHComposeDetailFormStyle">
	<LCHComposeInput
		LCHComposeInputItem={ LCHComposeDetailItem }
		LCHComposeInputKey={ 'LCHDocumentStyle' }
		LCHComposeInputOptions={ {
			mode: 'javascript',

			lineNumbers: true,
			lineWrapping: true,

			placeholder: OLSKLocalized('LCHComposeDetailFormStyleFieldText'),
			
		  keyMap: 'sublime',

			extraKeys: {
				Tab: false,
			},
		} }
		LCHComposeInputDispatchUpdate={ LCHComposeDetailDispatchUpdate }
		/>
</p>

<hr role="presentation" />

<p>
	<input class="LCHComposeDetailFormURLFilterField" placeholder="{ OLSKLocalized('LCHComposeDetailFormURLFilterFieldText') }" type="text" bind:value={ LCHComposeDetailItem.LCHDocumentURLFilter } on:input={ LCHComposeDetailDispatchUpdate } />
</p>

{#if LCHComposeDetailItem.LCHDocumentURLFilter }
	<p>
		<label>
			<input class="LCHComposeDetailFormIsAutomaticField" type="checkbox" bind:checked={ LCHComposeDetailItem.LCHDocumentIsAutomatic } on:input={ () => window.setTimeout(LCHComposeDetailDispatchUpdate) } />
			<span class="LCHComposeDetailFormIsAutomaticFieldLabel">{ OLSKLocalized('LCHComposeDetailFormIsAutomaticFieldLabelText') }</span>
		</label>
	</p>
{/if}

</div>

</div>

<style src="./ui-style.css"></style>
