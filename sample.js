function composedSample() {

	const api = {
		functionObjects: function () {
			return [

				// CUSTOM COMMAND 2

				{
					id: 'XYZQueueAlbum',
					fn: function XYZQueueAlbum () {
						this.api.fn('XYZCopyPageInfo')();

						window.location.href = 'nvalt://albums%20queue';
					},
					name: 'Queue sound',
					labels: [],
				},

				// CUSTOM COMMAND 1

				{
					id: 'XYZCopyPageInfo',
					fn: function XYZCopyPageInfo () {
						this.api.fn('ROCOCopyToClipboard')(`${document.title} ${location.href}`);
					},
					name: 'Copy URL and title',
					labels: ['share'],
				},

				// CUSTOM FUNCTION
				
				{
					id: 'ROCOCopyToClipboard',
					fn: function ROCOCopyToClipboard () {
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
					fn: function () {
						return d3;
					},
				},

				//# LOGIC
	  		
				{
					id: 'ROCOLogicFilter',
					fn: RCSLaunchletLogic.RCSLaunchletLogicFilter,
				},

				//# INTERFACE
	  		
				{
					id: 'ROCOInterfaceBezelDidReceiveInput',
					fn: function ROCOInterfaceBezelDidReceiveInput (inputText) {
						this.api.fn('ROCOReactBezelActions')(!inputText.trim() ? [] : this.api.actionObjects().filter(this.api.fn('ROCOLogicFilter')(inputText)));
					},
				},

				//# REACT

				{
					id: 'ROCOReactBezelActions',
					fn: function ROCOReactBezelActions (actionObjects) {
						const d3 = this.api.lib('d3');

						let selection = d3.select('#__LaunchletList').selectAll('.__LaunchletListItem').data(actionObjects);

						var parentElement = selection.enter()
							.append('div')
								.attr('class', '__LaunchletListItem');

						parentElement = parentElement.merge(selection);

						parentElement
							.classed('__LaunchletListItemSelected', function (obj, index) {
								return !index;
							})
							.text(function(obj) {
								return obj.name;
							});

						selection.exit().remove();

						d3.select('#__LaunchletList')
							.classed('__LaunchletHidden', !actionObjects.length);
					},
				},

				//# SETUP

				//_ ROCOSetupEverything
	  		
				{
					id: 'ROCOSetupEverything',
					fn: function ROCOSetupEverything () {
						this.api.fn('ROCOUnbuildEverything')();

						this.api.fn('ROCOSetupContainer')();
						this.api.fn('ROCOSetupBezel')();
						this.api.fn('ROCOSetupInput')();
						this.api.fn('ROCOSetupList')();
						this.api.fn('ROCOSetupStyle')();
				  },
				},

				//_ ROCOSetupContainer

				{
					id: 'ROCOSetupContainer',
					fn: function ROCOSetupContainer () {
						const d3 = this.api.lib('d3');

						d3.select('body').append('div')
							.attr('id', '__Launchlet')
							.attr('class', '__Launchlet');
				  },
				},

				//_ ROCOSetupBezel

				{
					id: 'ROCOSetupBezel',
					fn: function ROCOSetupBezel () {
						const d3 = this.api.lib('d3');

						d3.select('#__Launchlet').append('div')
							.attr('id', '__LaunchletBezel');
				  },
				},

				//_ ROCOSetupInput

				{
					id: 'ROCOSetupInput',
					fn: function ROCOSetupInput () {
						const d3 = this.api.lib('d3');
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

				//_ ROCOSetupList

				{
					id: 'ROCOSetupList',
					fn: function ROCOSetupList () {
						const d3 = this.api.lib('d3');

						d3.select('#__LaunchletBezel').append('div')
							.attr('id', '__LaunchletList')
							.classed('__LaunchletHidden', true);
				  },
				},

				//_ ROCOSetupStyle

				{
					id: 'ROCOSetupStyle',
					fn: function ROCOSetupStyle () {
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
					fn: function ROCOUnbuildEverything () {
						const d3 = this.api.lib('d3');

						d3.selectAll('.__Launchlet').remove();
				  },
				},

				//# LIFECYCLE
	  		
				{
					id: 'ROCOLifecycleInitialize',
					fn: function ROCOLifecycleInitialize () {
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

			return functionObject.fn.bind({
				api: api,
			});
		},
		lib: function (inputData) {
			return api.fn(inputData)();
		},
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