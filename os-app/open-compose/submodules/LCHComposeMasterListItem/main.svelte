<script>
export let LCHComposeMasterListItemTitle;
export let LCHComposeMasterListItemFlagged;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};
</script>

<div class="LCHComposeMasterListItem" class:LCHComposeMasterListItemFlagged={ LCHComposeMasterListItemFlagged }>

{#if LCHComposeMasterListItemFlagged }
	<strong class="LCHComposeMasterListItemFlaggedAlert">⚠️</strong>
{/if}

<strong class="LCHComposeMasterListItemTitle" aria-hidden="true">{ LCHComposeMasterListItemTitle }</strong>

</div>

<style>	
.LCHComposeMasterListItem {
	min-height: 46px;
	padding: 10px;
	border-bottom: var(--LCHBorderStyle);

	overflow: hidden;
	text-overflow: ellipsis;

	/* prevent breaking from long urls */
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

.LCHComposeMasterListItemTitle {
	display: inline-block;
}

.LCHComposeMasterListItemFlagged {
	background: #ffff66;
}
</style>
