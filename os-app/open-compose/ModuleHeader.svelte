<script>
import { OLSKLocalized } from '../_shared/common/global.js'
import RCSLanguageSwitcher from '../_shared/RCSLanguageSwitcher/Main.svelte';
</script>

<header class="Container">

<h1>{ OLSKLocalized('LCHComposeTitle') }</h1>

<RCSLanguageSwitcher />
	
</header>

<style>
.Container {
	/* AppContainerFlexboxChild */
	flex-shrink: 0;

	/* ContainerFlexboxParent */
	display: flex;
	justify-content: space-between;
	align-items: center;
}

h1 {
	margin: 0;

	font-size: 20px;
}

:global(#RCSLanguageSwitcher) {
	padding: 10px;

	font-size: 13px;
}

:global(#RCSLanguageSwitcher span) {
	/* browser quirks */
	padding-left: 4px;
}
</style>
