const RemoteStorage = typeof require === 'undefined' ? window.RemoteStorage : require('remotestoragejs');

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHStorageClient = global.LCHStorageClient || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); Object.assign(exports, {
	LCHStorageClientForModules: function (modules) {
		let remoteStorage = new RemoteStorage({
			modules: modules,
		});

		let outputData = {};

		outputData.remoteStorage = remoteStorage;

		modules.forEach(function (e) {
			remoteStorage.access.claim(e.name, 'rw');

			remoteStorage.caching.enable(`/${ e.name }/`);

			outputData[e.name] = remoteStorage[e.name];
		});

		return outputData;
	},
}); })));