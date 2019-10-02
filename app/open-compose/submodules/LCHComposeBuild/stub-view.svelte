<script>
import Module from './main.svelte';
</script>

<Module
	BuildInitializeModePipeEnabled={ false }
	BuildAppLanguageCode={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }
	{...Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())}
/>
