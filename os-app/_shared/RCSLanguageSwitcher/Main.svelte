<script>
let titleLabel = function (inputData) {
	return window.OLSKFormatted(window.OLSKLocalized('RCSLanguageSwitcherLinkTextFormat'), window.OLSKLocalized(['RCSLanguageSwitcherLinkTextLanguageName-', inputData].join('')));
};
</script>

<section id="RCSLanguageSwitcher">
	{#each window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable') as e}
		{#if e === window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }
			<span>{ e.toUpperCase() }</span>
		{/if}

		{#if e !== window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }
			<a aria-label="{ titleLabel(e) }" title="{ titleLabel(e) }" href="{ window.OLSKCanonicalFor(window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'), {
				OLSKRoutingLanguage: e,
			}) }">{ e.toUpperCase() }</a>
		{/if}

	{/each}
</section>
