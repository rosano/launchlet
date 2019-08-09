<script>
import LCHLauncherZoneInput from '../LCHLauncherZoneInput/main.svelte';
import LCHLauncherResultList from '../LCHLauncherResultList/main.svelte';
import LCHLauncherPipeItem from '../LCHLauncherPipeItem/main.svelte';

export let PromptItems = [];
export let HeaderText = undefined;
export let FilterText = undefined;
export let MatchStop = false;

let ItemSelected = null;
</script>

<div class="LCHLauncherPrompt">

{#if ItemSelected}
	<LCHLauncherZoneInput HeadingText={ HeaderText } FilterText={ FilterText } MatchStop={ MatchStop }>
		<LCHLauncherPipeItem itemTitle={ ItemSelected.LCHRecipeTitle } />
	</LCHLauncherZoneInput>
{:else}
	<LCHLauncherZoneInput HeadingText={ HeaderText } FilterText={ FilterText } MatchStop={ MatchStop } />
{/if}
<LCHLauncherResultList ListItems={ PromptItems } let:LCHLauncherResultListItem={ item } on:ItemSelectedDidChange={ (event) => ItemSelected = event.detail }>
	<div>{ item.LCHRecipeTitle }</div>
</LCHLauncherResultList>

</div>

<style>
.LCHLauncherPrompt :global(.LCHLauncherResultListItemSelected) {
	background: #bcdaff;
}
</style>
