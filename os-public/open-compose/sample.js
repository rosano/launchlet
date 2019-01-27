function composedSample() {
	let ROCOLaunchletPropertyListSelectedItemIndex = 0;
	let ROCOLaunchletPropertyShortcutListener;

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
					fn: function ROCOCopyToClipboard (inputData) {
						const el = document.createElement('textarea');
						el.value = inputData;
						el.setAttribute('readonly', '');
						el.style.position = 'fixed';
						el.style.top = 0;
						document.body.appendChild(el);
						el.select();
						document.execCommand('copy');
						el.remove();
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
					fn: LCHComposeLogic.LCHComposeLogicFilter,
				},

				//# PROPERTIES
	  		
				{
					id: 'ROCOPropertiesListSelectedItemIndex',
					fn: function ROCOPropertiesListSelectedItemIndex (inputData) {
						if (typeof inputData === 'undefined') {
							return ROCOLaunchletPropertyListSelectedItemIndex;
						}

						ROCOLaunchletPropertyListSelectedItemIndex = Math.max(0, Math.min(this.api.lib('d3').selectAll('.__LaunchletListItem').data().length, inputData));

						this.api.fn('ROCOReactBezelListSelectedItem')(ROCOLaunchletPropertyListSelectedItemIndex);
					},
				},

				//# INTERFACE
	  		
				{
					id: 'ROCOInterfaceBezelDidReceiveInput',
					fn: function ROCOInterfaceBezelDidReceiveInput (inputData) {
						this.api.fn('ROCOCommandsFilter')(inputData);
					},
				},
	  		
				{
					id: 'ROCOInterfaceDocumentDidKeyDown',
					fn: function ROCOInterfaceDocumentDidKeyDown (event) {
						if (event.code === 'Escape') {
							return this.api.fn('ROCOCommandsResetInput')('');
						}

						if (event.code === 'ArrowUp') {
							return this.api.fn('ROCOCommandsSetListSelectedItem')(this.api.fn('ROCOPropertiesListSelectedItemIndex')() - 1);
						};

						if (event.code === 'ArrowDown') {
							return this.api.fn('ROCOCommandsSetListSelectedItem')(this.api.fn('ROCOPropertiesListSelectedItemIndex')() + 1);
						};

						if (event.code === 'Enter') {
							return this.api.fn('ROCOCommandsLaunch')(d3.select('.__LaunchletListItemSelected').data().pop());
						};
					},
				},

				//# COMMANDS
	  		
				{
					id: 'ROCOCommandsResetInput',
					fn: function ROCOCommandsResetInput (inputData) {
						this.api.fn('ROCOInterfaceBezelDidReceiveInput')(inputData);
						this.api.fn('ROCOReactManualInput')(inputData);
					},
				},
	  		
				{
					id: 'ROCOCommandsFilter',
					fn: function ROCOCommandsFilter (inputData) {
						this.api.fn('ROCOCommandsSetListItems')(!inputData.trim() ? [] : this.api.actionObjects().filter(this.api.fn('ROCOLogicFilter')(inputData)));
					},
				},
	  		
				{
					id: 'ROCOCommandsSetListItems',
					fn: function ROCOCommandsSetListItems (inputData) {
						this.api.fn('ROCOReactBezelListItems')(inputData);
						
						this.api.fn('ROCOCommandsSetListSelectedItem')(0);
					},
				},
	  		
				{
					id: 'ROCOCommandsSetListSelectedItem',
					fn: function ROCOCommandsSetListSelectedItem (inputData) {
						this.api.fn('ROCOPropertiesListSelectedItemIndex')(inputData);
					},
				},
	  		
				{
					id: 'ROCOCommandsLaunch',
					fn: function ROCOCommandsLaunch (inputData) {
						if (!inputData || !inputData.fn) {
							throw new Error('LCHErrorInvalidInput');
						}

						this.api.fn('ROCOReactManualInput')(inputData.name);
						
						this.api.fn(inputData.id)();

						this.api.fn('ROCOCommandsExit')();
					},
				},
	  		
				{
					id: 'ROCOCommandsExit',
					fn: function ROCOCommandsExit () {
						this.api.lib('d3').select('#__Launchlet').classed('__LaunchletExit', true);
						setTimeout(this.api.fn('ROCOUnbuildEverything'), 500);
					},
				},

				//# REACT

				{
					id: 'ROCOReactBezelListItems',
					fn: function ROCOReactBezelListItems (actionObjects) {
						const d3 = this.api.lib('d3');

						let selection = d3.select('#__LaunchletList').selectAll('.__LaunchletListItem').data(actionObjects);

						var parentElement = selection.enter()
							.append('div')
								.attr('class', '__LaunchletListItem');

						parentElement = parentElement.merge(selection);

						parentElement
							.text(function(obj) {
								return obj.name;
							});

						selection.exit().remove();

						d3.select('#__LaunchletList')
							.classed('__LaunchletHidden', !actionObjects.length);
					},
				},

				{
					id: 'ROCOReactBezelListSelectedItem',
					fn: function ROCOReactBezelListSelectedItem (selectedIndex) {
						this.api.lib('d3').selectAll('.__LaunchletListItem').classed('__LaunchletListItemSelected', function (obj, index) {
								return index === selectedIndex;
							});
					},
				},

				{
					id: 'ROCOReactManualInput',
					fn: function ROCOReactManualInput (inputData) {
						d3.select('#__LaunchletInput').property('value', inputData);
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
						this.api.fn('ROCOSetupShortcuts')();
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

				//_ ROCOSetupShortcuts

				{
					id: 'ROCOSetupShortcuts',
					fn: function ROCOSetupShortcuts () {
						document.body.addEventListener('keydown', ROCOLaunchletPropertyShortcutListener = this.api.fn('ROCOInterfaceDocumentDidKeyDown'));
				  },
				},

				//# UNBUILD

				//_ ROCOUnbuildEverything
	  		
				{
					id: 'ROCOUnbuildEverything',
					fn: function ROCOUnbuildEverything () {
						this.api.fn('ROCOUnbuildShortcuts')();

						this.api.lib('d3').selectAll('.__Launchlet').remove();
				  },
				},

				//_ ROCOUnbuildShortcuts

				{
					id: 'ROCOUnbuildShortcuts',
					fn: function ROCOUnbuildShortcuts () {
						document.body.removeEventListener('keydown', ROCOLaunchletPropertyShortcutListener);
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