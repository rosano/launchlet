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
		new MainApp({
			target: document.getElementById('LCHBookmarkletTarget'),
			props: {
				name: 'world',
			},
		});
	},

	//# LIFECYCLE

	lifecyclePageWillLoad: function () {
		moi.setupEverything();
	},
}); })));
