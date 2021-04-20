<script>
export let LCHComposeListItem;

import LCHComposeLogic from './ui-logic.js';
</script>

<div class="LCHComposeListItem" class:LCHComposeListItemFlagged={ LCHComposeListItem.LCHDocumentIsFlagged }>

{#if LCHComposeListItem.LCHDocumentIsFlagged }
	<strong class="LCHComposeListItemFlaggedAlert">⚠️</strong>
{/if}

<strong class="LCHComposeListItemTitle">{ LCHComposeLogic.LCHComposeListItemTitle(LCHComposeListItem) }</strong>

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
