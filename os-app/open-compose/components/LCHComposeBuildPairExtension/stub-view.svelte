<script>
import Module from './main.svelte';
</script>

<Module
	{...Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())}
/>
