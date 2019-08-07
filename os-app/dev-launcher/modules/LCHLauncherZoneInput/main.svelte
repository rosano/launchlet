<script>
export let nameText = '';
export let isSelected = false;
export let didClick = null;
</script>

<div class="LCHLauncherZoneInput" class:LCHLauncherZoneInputSelected={ isSelected } on:click={ () => didClick && didClick() }>

<div class="Container">

<strong class="LCHLauncherZoneInputName">{ nameText || 'Undefined' }</strong>
<slot>
<span class="LCHLauncherZoneInputPlaceholder">Type to search</span>
</slot>

</div>

</div>

<style>
.LCHLauncherZoneInput {
	padding: 3px;
	border: solid 1px hsl(0, 0%, 90%);
	border-radius: 6px;

	background: hsl(0, 0%, 95%);
	font-family: 'Lucida Grande', 'Helvetica', sans-serif;
	font-size: 8pt;
	color: hsl(0, 0%, 30%);

	/* @LCHLauncherZoneInputFlexbox:Parent */
	display: flex;
}

.Container {
	height: 30px;
	
	padding: 4px;
	border-radius: 4px;

	/* @LCHLauncherZoneInputFlexbox:Child */
	flex-grow: 1;

	/* @ContainerFlexbox Parent */
	display: flex;
	justify-content: center;
	align-items: center;
}

.LCHLauncherZoneInputSelected .Container {
	background: #bcdaff;
}

.LCHLauncherZoneInputPlaceholder {
	/* DisableTextSelection */
	pointer-events: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>
