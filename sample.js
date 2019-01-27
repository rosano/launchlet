function composedSample() {

	const api = {
		functionObjects: function () {
			return [

				// CUSTOM COMMAND 2

				{
					id: 'XYZQueueAlbum',
					callback: function XYZQueueAlbum () {
						this.api.fn('XYZCopyPageInfo')();

						window.location.href = 'nvalt://albums%20queue';
					},
					name: 'Queue sound',
					tags: [],
				},

				// CUSTOM COMMAND 1

				{
					id: 'XYZCopyPageInfo',
					callback: function XYZCopyPageInfo () {
						this.api.fn('ROCOCopyToClipboard')(`${document.title} ${location.href}`);
					},
					name: 'Copy URL and title',
					tags: ['share'],
				},

				// CUSTOM FUNCTION
				
				{
					id: 'ROCOCopyToClipboard',
					callback: function ROCOCopyToClipboard () {
						const el = document.createElement('textarea');
						el.value = inputData;
						el.setAttribute('readonly', '');
						el.style.position = 'fixed';
						el.style.top = 0;
						document.body.appendChild(el);
						el.select();
						document.execCommand('copy');
					},
				},

				// D3
				
				{
					id: 'd3',
					callback: function () {
						return d3;
					},
				},

				//# LOGIC
	  		
				{
					id: 'ROCOLogicFilter',
					callback: function ROCOLogicFilter () {},
				},

				//# INTERFACE
	  		
				{
					id: 'ROCOInterfaceBezelDidReceiveInput',
					callback: function ROCOInterfaceBezelDidReceiveInput (inputText) {
						this.api.fn('ROCOReactBezelActions')(this.api.actionObjects().filter(this.api.fn('ROCOLogicFilter')(inputText)));
					},
				},

				//# REACT

				{
					id: 'ROCOReactBezelActions',
					callback: function ROCOReactBezelActions (actionObjects) {},
				},

				//# SETUP

				//_ ROCOSetupEverything
	  		
				{
					id: 'ROCOSetupEverything',
					callback: function ROCOSetupEverything () {
						this.api.fn('ROCOUnbuildEverything')();

						this.api.fn('ROCOSetupContainer')();
						this.api.fn('ROCOSetupBezel')();
						this.api.fn('ROCOSetupInput')();
						this.api.fn('ROCOSetupStyle')();
				  },
				},

				//_ ROCOSetupContainer

				{
					id: 'ROCOSetupContainer',
					callback: function ROCOSetupContainer () {
						const d3 = this.api.fn('d3')();

						d3.select('body').append('div')
							.attr('id', '__Launchlet')
							.attr('class', '__Launchlet');
				  },
				},

				//_ ROCOSetupBezel

				{
					id: 'ROCOSetupBezel',
					callback: function ROCOSetupBezel () {
						const d3 = this.api.fn('d3')();

						d3.select('#__Launchlet').append('div')
							.attr('id', '__LaunchletBezel');
				  },
				},

				//_ ROCOSetupInput

				{
					id: 'ROCOSetupInput',
					callback: function ROCOSetupInput () {
						const d3 = this.api.fn('d3')();
						let api = this.api;

						d3.select('#__LaunchletBezel').append('input')
							.attr('id', '__LaunchletInput')
							.attr('autofocus', '')
							.attr('placeholder', 'Type to search')
							.on('input', function () {
								api.fn('ROCOInterfaceBezelDidReceiveInput')(this.value);
							});
				  },
				},

				//_ ROCOSetupStyle

				{
					id: 'ROCOSetupStyle',
					callback: function ROCOSetupStyle () {
d3.select('body').append('style').node().outerHTML = `
<style type="text/css" class="__Launchlet">
// paste styles
</style>
`;
				  },
				},

				//# UNBUILD

				//_ ROCOUnbuildEverything
	  		
				{
					id: 'ROCOUnbuildEverything',
					callback: function ROCOUnbuildEverything () {
						const d3 = this.api.fn('d3')();

						d3.selectAll('.__Launchlet').remove();
				  },
				},

				//# LIFECYCLE
	  		
				{
					id: 'ROCOLifecycleInitialize',
					callback: function ROCOLifecycleInitialize () {
						this.api.fn('ROCOSetupEverything')(true);
				  },
				},
			];
		},
		actionObjects: function () {
			return api.functionObjects().filter(function (e) {
				return !!e.name;
			});
		},
		fn: function (inputData) {
			// ! string

			// ! blank

			// ! id untrimmed whitespace

			let functionObject = api.functionObjects().filter(function (e) {
				return e.id === inputData;
			}).shift();

			// ! non existant

			return functionObject.callback.bind({
				api: api,
			});
		}
	};

	api.fn('ROCOLifecycleInitialize')();
};

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.RCSLauchletSample = global.RCSLauchletSample || {})));
}(this, (function (exports) { 'use strict';

	exports.composedSample = composedSample;

	Object.defineProperty(exports, '__esModule', { value: true });

})));