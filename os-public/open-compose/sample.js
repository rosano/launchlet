function composedSample() {
	let LCHLaunchletPropertyListSelectedItemIndex = 0;
	let LCHLaunchletPropertyShortcutListener;

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
					id: 'LCHLogicFilter',
					fn: LCHComposeLogic.LCHComposeLogicFilter,
				},

				//# PROPERTIES
	  		
				{
					id: 'LCHPropertiesListSelectedItemIndex',
					fn: function LCHPropertiesListSelectedItemIndex (inputData) {
						if (typeof inputData === 'undefined') {
							return LCHLaunchletPropertyListSelectedItemIndex;
						}

						LCHLaunchletPropertyListSelectedItemIndex = Math.max(0, Math.min(this.api.lib('d3').selectAll('.__LaunchletListItem').data().length, inputData));

						this.api.fn('LCHReactBezelListSelectedItem')(LCHLaunchletPropertyListSelectedItemIndex);
					},
				},

				//# INTERFACE
	  		
				{
					id: 'LCHInterfaceBezelDidReceiveInput',
					fn: function LCHInterfaceBezelDidReceiveInput (inputData) {
						this.api.fn('LCHCommandsFilter')(inputData);
					},
				},
	  		
				{
					id: 'LCHInterfaceDocumentDidKeyDown',
					fn: function LCHInterfaceDocumentDidKeyDown (event) {
						if (event.code === 'Escape') {
							return this.api.fn('LCHCommandsResetInput')('');
						}

						if (event.code === 'ArrowUp') {
							return this.api.fn('LCHCommandsSetListSelectedItem')(this.api.fn('LCHPropertiesListSelectedItemIndex')() - 1);
						};

						if (event.code === 'ArrowDown') {
							return this.api.fn('LCHCommandsSetListSelectedItem')(this.api.fn('LCHPropertiesListSelectedItemIndex')() + 1);
						};

						if (event.code === 'Enter') {
							return this.api.fn('LCHCommandsLaunch')(d3.select('.__LaunchletListItemSelected').data().pop());
						};
					},
				},

				//# COMMANDS
	  		
				{
					id: 'LCHCommandsResetInput',
					fn: function LCHCommandsResetInput (inputData) {
						this.api.fn('LCHInterfaceBezelDidReceiveInput')(inputData);
						this.api.fn('LCHReactManualInput')(inputData);
					},
				},
	  		
				{
					id: 'LCHCommandsFilter',
					fn: function LCHCommandsFilter (inputData) {
						this.api.fn('LCHCommandsSetListItems')(!inputData.trim() ? [] : this.api.actionObjects().filter(this.api.fn('LCHLogicFilter')(inputData)));
					},
				},
	  		
				{
					id: 'LCHCommandsSetListItems',
					fn: function LCHCommandsSetListItems (inputData) {
						this.api.fn('LCHReactBezelListItems')(inputData);
						
						this.api.fn('LCHCommandsSetListSelectedItem')(0);
					},
				},
	  		
				{
					id: 'LCHCommandsSetListSelectedItem',
					fn: function LCHCommandsSetListSelectedItem (inputData) {
						this.api.fn('LCHPropertiesListSelectedItemIndex')(inputData);
					},
				},
	  		
				{
					id: 'LCHCommandsLaunch',
					fn: function LCHCommandsLaunch (inputData) {
						if (!inputData || !inputData.fn) {
							throw new Error('LCHErrorInvalidInput');
						}

						this.api.fn('LCHReactManualInput')(inputData.name);
						
						this.api.fn(inputData.id)();

						this.api.fn('LCHCommandsExit')();
					},
				},
	  		
				{
					id: 'LCHCommandsExit',
					fn: function LCHCommandsExit () {
						this.api.lib('d3').select('#__Launchlet').classed('__LaunchletExit', true);
						setTimeout(this.api.fn('LCHUnbuildEverything'), 500);
					},
				},

				//# REACT

				{
					id: 'LCHReactBezelListItems',
					fn: function LCHReactBezelListItems (actionObjects) {
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
					id: 'LCHReactBezelListSelectedItem',
					fn: function LCHReactBezelListSelectedItem (selectedIndex) {
						this.api.lib('d3').selectAll('.__LaunchletListItem').classed('__LaunchletListItemSelected', function (obj, index) {
								return index === selectedIndex;
							});
					},
				},

				{
					id: 'LCHReactManualInput',
					fn: function LCHReactManualInput (inputData) {
						d3.select('#__LaunchletInput').property('value', inputData);
					},
				},	

				//# SETUP

				//_ LCHSetupEverything
	  		
				{
					id: 'LCHSetupEverything',
					fn: function LCHSetupEverything () {
						this.api.fn('LCHUnbuildEverything')();

						this.api.fn('LCHSetupContainer')();
						this.api.fn('LCHSetupBezel')();
						this.api.fn('LCHSetupInput')();
						this.api.fn('LCHSetupList')();
						this.api.fn('LCHSetupStyle')();
						this.api.fn('LCHSetupShortcuts')();
				  },
				},

				//_ LCHSetupContainer

				{
					id: 'LCHSetupContainer',
					fn: function LCHSetupContainer () {
						const d3 = this.api.lib('d3');

						d3.select('body').append('div')
							.attr('id', '__Launchlet')
							.attr('class', '__Launchlet');
				  },
				},

				//_ LCHSetupBezel

				{
					id: 'LCHSetupBezel',
					fn: function LCHSetupBezel () {
						const d3 = this.api.lib('d3');

						d3.select('#__Launchlet').append('div')
							.attr('id', '__LaunchletBezel');
				  },
				},

				//_ LCHSetupInput

				{
					id: 'LCHSetupInput',
					fn: function LCHSetupInput () {
						const d3 = this.api.lib('d3');
						let api = this.api;

						d3.select('#__LaunchletBezel').append('input')
							.attr('id', '__LaunchletInput')
							.attr('autofocus', '')
							.attr('placeholder', 'Type to search')
							.on('input', function () {
								api.fn('LCHInterfaceBezelDidReceiveInput')(this.value);
							});
				  },
				},

				//_ LCHSetupList

				{
					id: 'LCHSetupList',
					fn: function LCHSetupList () {
						const d3 = this.api.lib('d3');

						d3.select('#__LaunchletBezel').append('div')
							.attr('id', '__LaunchletList')
							.classed('__LaunchletHidden', true);
				  },
				},

				//_ LCHSetupStyle

				{
					id: 'LCHSetupStyle',
					fn: function LCHSetupStyle () {
d3.select('body').append('style').node().outerHTML = `
<style type="text/css" class="__Launchlet">
// paste styles
</style>
`;

				  },
				},

				//_ LCHSetupShortcuts

				{
					id: 'LCHSetupShortcuts',
					fn: function LCHSetupShortcuts () {
						document.body.addEventListener('keydown', LCHLaunchletPropertyShortcutListener = this.api.fn('LCHInterfaceDocumentDidKeyDown'));
				  },
				},

				//# UNBUILD

				//_ LCHUnbuildEverything
	  		
				{
					id: 'LCHUnbuildEverything',
					fn: function LCHUnbuildEverything () {
						this.api.fn('LCHUnbuildShortcuts')();

						this.api.lib('d3').selectAll('.__Launchlet').remove();
				  },
				},

				//_ LCHUnbuildShortcuts

				{
					id: 'LCHUnbuildShortcuts',
					fn: function LCHUnbuildShortcuts () {
						document.body.removeEventListener('keydown', LCHLaunchletPropertyShortcutListener);
				  },
				},

				//# LIFECYCLE
	  		
				{
					id: 'LCHLifecycleInitialize',
					fn: function LCHLifecycleInitialize () {
						this.api.fn('LCHSetupEverything')(true);
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

	api.fn('LCHLifecycleInitialize')();
};

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHComposeSample = global.LCHComposeSample || {})));
}(this, (function (exports) { 'use strict';

	exports.composedSample = composedSample;

	Object.defineProperty(exports, '__esModule', { value: true });

})));