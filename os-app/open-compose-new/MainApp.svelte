<script>
import Header from './ModuleHeader.svelte'
</script>

<div class="AppContainer">

<Header/>

<div id="ConvertContainer">
	<h1>Hello world</h1>
</div>

</div>

<style>
.AppContainer {
	height: 100vh;

	font-family: 'Helvetica Neue', 'Helvetica', sans;

	/* AppContainerFlexboxParent */
	display: flex;
	flex-direction: column;
}
</style>
