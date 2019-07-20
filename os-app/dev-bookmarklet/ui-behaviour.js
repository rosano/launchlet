(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHBookmarkletBehaviour = global.LCHBookmarkletBehaviour || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); let moi = {}; Object.assign(exports, moi = {

	//# SETUP

	setupEverything: function () {
		moi.setupBookmarklet();
	},

	setupBookmarklet: function () {
		let app = new Main({
			target: document.getElementById('LCHBookmarkletTarget'),
			props: {
				memberObjects: [
					{
						id: 'XYZAlfa',
						fn: function XYZAlfa () {
							alert('Alfa');
						},
						name: 'Alfa',
					}, {
						id: 'XYZBravo',
						fn: function XYZBravo () {
							alert('Bravo');
						},
						name: 'Bravo',
					}, {
						id: 'XYZCharlie',
						fn: function XYZCharlie () {
							alert('Charlie');
						},
						name: 'Charlie',
						labels: ['alfa'],
					},
				],
				workflowDidTerminate () {
					return (app.$destroy() || true) && (app = null);
				},
			},
		});
	},

	//# LIFECYCLE

	lifecyclePageWillLoad: function () {
		moi.setupEverything();
	},
}); })));
