<script>
export let LCHComposePairClearIsVisible;
export let LCHComposePairDispatchSubmit;
export let LCHComposePairDispatchClear;

import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	_ValueKey: '',

	// INTERFACE

	InterfaceFormDidSubmit (event) {
		event.preventDefault()
		
		LCHComposePairDispatchSubmit(mod._ValueKey);
	},

};
</script>

<div class="LCHComposePair">

{#if !LCHComposePairClearIsVisible}
	<form on:submit={ mod.InterfaceFormDidSubmit }>
		<input class="LCHComposePairKeyField" placeholder={ OLSKLocalized('LCHComposePairKeyFieldText') } bind:value={ mod._ValueKey } autofocus />

		<button class="LCHComposePairSubmitButton">{ OLSKLocalized('LCHComposePairSubmitButtonText') }</button>
	</form>
{/if}

{#if LCHComposePairClearIsVisible}
	<button class="LCHComposePairClearButton" on:click={ LCHComposePairDispatchClear }>{ OLSKLocalized('LCHComposePairClearButtonText') }</button>
{/if}

</div>

<style>
.LCHComposePair, form {
	display: inline;
}

input {
	border: var(--LCHBorderStyle);
	border-radius: 5px;
	padding: 5px;

	background: hsl(0, 0%, 100%);
	color: hsl(0, 0%, 80%);
}
</style>
