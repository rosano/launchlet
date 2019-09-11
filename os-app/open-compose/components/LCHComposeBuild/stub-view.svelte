<script>
import Module from './main.svelte';
</script>

<Module
	BuildInitializeModePipeEnabled={ false }
	BuildAppStyle={ '' }
	BuildAppBehaviour={ '' }
	BuildAppLanguageCode={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }
	{...Object.fromEntries((new URLSearchParams(window.location.search)).entries())}
/>
