<script>
export let LCHComposeListItemTitle;
export let LCHComposeListItemFlagged;

import { OLSKLocalized } from 'OLSKInternational';
</script>

<div class="LCHComposeListItem OLSKCommonEdgeBottom" class:LCHComposeListItemFlagged={ LCHComposeListItemFlagged }>

{#if LCHComposeListItemFlagged }
	<strong class="LCHComposeListItemFlaggedAlert">⚠️</strong>
{/if}

<strong class="LCHComposeListItemTitle" aria-hidden="true">{ LCHComposeListItemTitle }</strong>

</div>

<style>	
.LCHComposeListItem {
	min-height: 46px;
	padding: 10px;
	
	overflow: hidden;
	text-overflow: ellipsis;

	/* prevent breaking from long urls */
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

.LCHComposeListItemTitle {
	display: inline-block;
}

.LCHComposeListItemFlagged {
	background: #ffff66;
}
</style>
