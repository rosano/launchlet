(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.OLSKServiceWorker = global.OLSKServiceWorker || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); let mod = {}; Object.assign(exports, mod = {
	_OLSKServiceWorkerTemplate: function () {
		const cacheName = `LCHServiceWorkerCache-{ OLSKServiceWorkerVersionID }`;

		self.addEventListener('activate', function (event) {
			console.log('activate', event);
			
			event.waitUntil(async function() {
				await Promise.all(
					(await caches.keys()).map(function (e) {
						return caches.delete(e);
					})
				);
			}());
		});

		self.addEventListener('fetch', function (event) {
			if (event.request.method !== 'GET') {
				return console.log('ignoring non-Get', event.request);
			}

			if (event.request.url.match('sw.js')) {
				return console.log('ignoring sw.js', event.request);
			}

			if (event.request.mode === 'cors') {
				return console.log('ignoring cors', event.request);
			}

			if (event.request.url.match('/panel/read')) {
				return console.log('ignoring panel read', event.request);
			}

			if (event.request.url.match('/login')) {
				return console.log('ignoring login', event.request);
			}

			if (event.request.url.match('/api/')) {
				return console.log('ignoring api', event.request);
			}

			event.respondWith(async function() {
				let cacheResponse = await caches.match(event.request);

				if (cacheResponse) {
					return cacheResponse;
				}

				let networkResponse = await fetch(event.request);

				if (networkResponse.status !== 200) {
					return networkResponse;
				}

				(await caches.open(cacheName)).put(event.request, networkResponse.clone());

				return networkResponse;
			}());
		});

		self.addEventListener('message', function (event) {
			console.log('message', event);

		  if (event.data.action === 'skipWaiting') {
		    self.skipWaiting();
		  }
		});
	},
	OLSKServiceWorkerViewForVersionID: function (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKrrorInputInvalid');
		}

		if (!inputData) {
			throw new Error('OLSKrrorInputInvalid');
		}

		if (inputData.match(/\s/)) {
			throw new Error('OLSKrrorInputInvalid');
		}

		return mod._OLSKServiceWorkerTemplate.toString().replace('function () {', '').trim().slice(0, -1);
	},
}); })));