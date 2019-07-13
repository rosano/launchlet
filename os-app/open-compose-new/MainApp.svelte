<script>
import * as LCHStorageClient from '../_shared/LCHStorageClient/main.js';
import * as RSModuleProtocol_lch_members from '../_shared/rs-modules/lch_members/rs-module.js';
import Widget from '../_shared/_external/remotestorage-widget/build/widget.js';
import Header from './ModuleHeader.svelte';

import { onMount } from 'svelte';

let storageClient = LCHStorageClient.LCHStorageClientForModules([
	RSModuleProtocol_lch_members.RSModuleProtocolModuleForChangeDelegate({
		OLSKChangeDelegateAdd: function (inputData) {
			console.log('OLSKChangeDelegateAdd', inputData);
			// return moi.propertiesNoteObjects(moi.propertiesNoteObjects().concat(inputData));
		},
		OLSKChangeDelegateRemove: function (inputData) {
			console.log('OLSKChangeDelegateRemove', inputData);
			// return moi.propertiesNoteObjects(moi.propertiesNoteObjects().filter(function (e) {
			// 	return e.LCHNoteID !== inputData.LCHNoteID;
			// }))
		},
		OLSKChangeDelegateUpdate: function (inputData) {
			console.log('OLSKChangeDelegateUpdate', inputData);
			// return moi.propertiesNoteObjects(moi.propertiesNoteObjects().map(function (e) {
			// 	return Object.assign(e, e.LCHNoteID === inputData.LCHNoteID ? inputData : {});
			// }));
		},
	}),
]);

let remoteStorage = storageClient.remoteStorage;

remoteStorage.on('ready', async () => {
	console.debug('ready', arguments);

	await remoteStorage.lch_members.init();

	// setupFinalize(); remove loading class
});

(function SetupStorageClientLogging() {
	remoteStorage.on('not-connected', () => {
		console.debug('not-connected', arguments);
	});

	remoteStorage.on('disconnected', () => {
		console.debug('disconnected', arguments);
	});

	remoteStorage.on('error', () => {
		console.debug('error', arguments);
	});

	remoteStorage.on('connected', () => {
		console.debug('connected', arguments);
	});

	remoteStorage.on('connected', () => {
		console.debug('connected', arguments);
	});

	remoteStorage.on('error', () => {
		console.debug('error', arguments);
	});

	remoteStorage.on('network-offline', () => {
		console.debug('network-offline', arguments);
	});

	remoteStorage.on('network-online', () => {
		console.debug('network-online', arguments);
	});

	remoteStorage.on('sync-done', () => {
		console.debug('sync-done', arguments);
	});
})();

onMount(function () {
	(new Widget(remoteStorage)).attach('LCHStorageWidget');
});
</script>

<div class="AppContainer">

<Header/>

<div>
	<h1>Hello world</h1>
</div>

<div id="LCHStorageWidget"></div>

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
