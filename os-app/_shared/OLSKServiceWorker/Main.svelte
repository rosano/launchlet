<script>
export const disableServiceWorker = false;
export let registrationRoute = null;

import { OLSKLocalized } from '../common/global.js'

let notificationElement, reloadButton, registration, notificationIsVisible, nextWorker;

function handleUpdateFound (event) {
	console.log('updatefound', event);

	nextWorker = registration.installing;

	nextWorker.addEventListener('statechange', function (event) {
		console.log('statechange', nextWorker.state, event, navigator.serviceWorker.controller);

		if (nextWorker.state !== 'installed') {
			return;
		}

		if (!navigator.serviceWorker.controller) {
			return;
		}

		notificationIsVisible = true;
	});
}

import { onMount, afterUpdate } from 'svelte';
onMount(async function StartSetup() {
	if (disableServiceWorker) {
		return console.info('Service worker disabled');
	}

	if (!navigator.serviceWorker) {
		return console.info('Service worker not available');
	}

	if (!registrationRoute) {
		return console.info('Missing registration route');
	}

	registration = await navigator.serviceWorker.register(registrationRoute);
	
	console.info('Service Worker Registered');

	registration.addEventListener('updatefound', handleUpdateFound);

	navigator.serviceWorker.addEventListener('controllerchange', function (event) {
		console.log('controllerchange', event);

		window.location.reload();
	});
});
afterUpdate(function () {
	(function() {
		if (!notificationElement) {
			return;
		}

		notificationElement.addEventListener('click', function () {
			notificationElement.remove();
		});
	})();

	(function() {
		if (!reloadButton) {
			return;
		}

		reloadButton.addEventListener('click', function () {
			nextWorker.postMessage({
				action: 'skipWaiting',
			});
		});
	})();
});
</script>

{#if notificationIsVisible}
<div class="OLSKServiceWorkerUpdateNotification" bind:this={ notificationElement }>
	{ OLSKLocalized('OLSKServiceWorkerUpdateAvailable') }
	<button bind:this={ reloadButton }>{ OLSKLocalized('OLSKServiceWorkerReload') }</button>
</div>
{/if}

<style type="text/css">
	.OLSKServiceWorkerUpdateNotification {
		padding: 10px;
		border: 1px solid #7f7f7f;

		position: fixed;
		top: 0;
		right: 0;

		background: #f3f3f3;
	}

</style>
