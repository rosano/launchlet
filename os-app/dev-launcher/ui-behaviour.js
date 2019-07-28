(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.LCHLauncherBehaviour = global.LCHLauncherBehaviour || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); let moi = {}; Object.assign(exports, moi = {

	//# SETUP

	setupEverything() {
		moi.setupFormulas();
		moi.setupLauncher();
	},
	setupFormulas() {
		window.LCHPageFormulas = function () {
			return [
				{
					id: 'XYZAlfa',
					fn: function XYZAlfa () {
						alert('Alfa');
					},
					name: 'Alfa',
				},
			];
		};
	},
	setupLauncher() {
		let app = new Main({
			target: document.getElementById('LCHLauncherTarget'),
			props: {
				formulaObjects: [
					{
						id: 'XYZBravo',
						fn: function XYZBravo () {
							alert('Bravo');
						},
						name: 'Bravo',
					},
				],
				optionsObject: {
					_didFinish () {
						return (app.$destroy() || true) && (app = null);
					},
				}
			},
		});
	},

	//# LIFECYCLE

	lifecyclePageWillLoad () {
		moi.setupEverything();
	},
}); })));
