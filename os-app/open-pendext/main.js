(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHCompile = global.LCHCompile || {})));
}(this, (function (exports) { 'use strict';

	//_ LCHModelErrorsForUnwrappedMemberObject

	exports.LCHModelErrorsForUnwrappedMemberObject = function (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputInvalid');
		}

		let errorsHash = {};

		if (typeof inputData.id !== 'string') {
			errorsHash.id = new Error('LCHErrorNotString');
		}

		if (typeof inputData.fnbody !== 'string') {
			errorsHash.fnbody = new Error('LCHErrorNotString');
		}

		if (inputData.name !== undefined) {
			if (typeof inputData.name !== 'string') {
				errorsHash.name = new Error('LCHErrorNotString');
			}
		}

		if (inputData.args !== undefined) {
			if (typeof inputData.args !== 'string') {
				errorsHash.args = new Error('LCHErrorNotString');
			}
		}

		return Object.keys(errorsHash).length ? errorsHash : null;
	};

	//_ LCHLogicFilter

	exports.LCHLogicFilter = function (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		return function (e) {
			return [].concat([e.name]).concat(e.labels).filter(function (e) {
				if (!e) {
					return false;
				}

				return e.match(new RegExp(inputData, 'i'));
			}).length > 0;
		};
	};

	//_ LCHWrappedMemberObjectFor

	exports.LCHWrappedMemberObjectFor = function (inputData) {
		if (exports.LCHModelErrorsForUnwrappedMemberObject(inputData)) {
			throw new Error('LCHErrorInputInvalid');
		}

		return Object.keys(inputData).reduce(function (coll, e) {
			if (e === 'args') {
				return coll;
			}

			if (e === 'fnbody') {
				return Object.assign(coll, {
					fnclosure: `function (${ inputData.args || '' }) { ${ inputData.fnbody } }`,
				});
			}

			coll[e] = inputData[e];

			return coll;
		}, {});
	};

	//_ LCHBoomarkletTemplate

	exports.LCHBoomarkletTemplate = function () {
		let LCHLaunchletPropertyListSelectedItemIndex = 0;
		let LCHLaunchletPropertyShortcutListener;
		let _protectFromSvelteCompiler = console.log;

		_protectFromSvelteCompiler('__LCHTokenLibraryD3__')

		const api = {
			functionObjects: function () {
				return [

	//# LIBRARIES

	{
		id: 'd3',
		fn: function () {
			return d3;
		},
	},

	//# LOGIC

	{
		id: 'LCHLogicFilter',
		fn: _protectFromSvelteCompiler('__LCHTokenLCHLogicFilter__'),
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
			if (event.code === 'Escape' && d3.select('#__LaunchletInput').property('value').length) {
				return this.api.fn('LCHCommandsResetInput')('');
			}

			if (event.code === 'Escape') {
				return this.api.fn('LCHCommandsExit')();
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
				return;
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

			let parentElement = selection.enter()
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
			d3.select('body').append('style').node().outerHTML = `<style type="text/css" class="__Launchlet">_protectFromSvelteCompiler('__LCHTokenStyle__')</style>`;
	  },
	},

	//_ LCHSetupShortcuts

	{
		id: 'LCHSetupShortcuts',
		fn: function LCHSetupShortcuts () {
			document.getElementById('__Launchlet').addEventListener('keydown', LCHLaunchletPropertyShortcutListener = this.api.fn('LCHInterfaceDocumentDidKeyDown'));
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
			if (!document.getElementById('__Launchlet')) {
				return;
			}
			
			document.getElementById('__Launchlet').removeEventListener('keydown', LCHLaunchletPropertyShortcutListener);
	  },
	},

	//# LIFECYCLE

	{
		id: 'LCHLifecycleInitialize',
		fn: function LCHLifecycleInitialize () {
			this.api.fn('LCHSetupEverything')(true);
	  },
	},
	].concat(_protectFromSvelteCompiler('__LCHTokenMemberObjects__'));
			},
			actionObjects: function () {
				return api.functionObjects().filter(function (e) {
					return !!e.name;
				});
			},
			fn: function (inputData) {
				if (typeof inputData !== 'string') {
					throw new Error('LCHBookmarkletErrorIdentifierNotString');
				}

				if (inputData === '') {
					throw new Error('LCHBookmarkletErrorIdentifierBlank');
				}

				if (inputData.trim() !== inputData) {
					throw new Error('LCHBookmarkletErrorIdentifierContainsUntrimmedWhitespace');
				}

				let functionObject = api.functionObjects().filter(function (e) {
					return e.id === inputData;
				}).shift();

				if (!functionObject) {
					throw new Error('LCHBookmarkletErrorIdentifierNotDefined');
				}

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

	//_ LCHTokenHashFor

	exports.LCHTokenHashFor = function (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputInvalid');
		}

		if (!Array.isArray(inputData.LCHInputMemberObjects)) {
			throw new Error('LCHErrorInputInvalid');
		}

		if (typeof inputData.LCHInputStyleContent !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		if (typeof inputData.LCHInputLibraryD3Content !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		return {
			'__LCHTokenStyle__': inputData.LCHInputStyleContent,
			'__LCHTokenLibraryD3__': inputData.LCHInputLibraryD3Content,
			'__LCHTokenLCHLogicFilter__': exports.LCHLogicFilter.toString(),
			'__LCHTokenMemberObjects__': exports._LCHTokenMemberObjectsReplacementFor(inputData.LCHInputMemberObjects),
		};
	};

	//_ _LCHTokenMemberObjectsReplacementFor

	exports._LCHTokenMemberObjectsReplacementFor = function (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('LCHErrorInputInvalid');
		}

		let tokenHash = {};

		let outputData = JSON.stringify(inputData.map(function (e) {
			return Object.keys(e).reduce(function (coll, key) {
				if (key === 'fnclosure') {
					key = `__LCHMemberObjectClosure_${ e.id }__`;

					tokenHash[key] = e.fnclosure;

					return Object.assign(coll, {
						fn: `__LCHClosureOpen__${ key }__LCHClosureClose__`,
					});
				}

				coll[key] = e[key];

				return coll;
			}, {});
		}));
		
		return Object.keys(tokenHash).reduce(function (coll, e) {
			return coll.replace(e, tokenHash[e]);
		}, outputData).replace(/("__LCHClosureOpen__)|(__LCHClosureClose__")/g, '');
	};

	//_ LCHBookmarkletTextForTokenHash

	exports.LCHBookmarkletTextForTokenHash = function (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputInvalid');
		}

		return Object.keys(inputData).reduce(function (coll, e) {
			return coll.replace(`_protectFromSvelteCompiler('${e}')`, inputData[e]);
		}, exports.LCHBoomarkletTemplate.toString());
	};

	//_ LCHBookmarkletBinaryFor

	exports.LCHBookmarkletBinaryFor = function (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		return `javascript:(${encodeURIComponent(inputData)})();`;
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
