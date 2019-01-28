(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHComposeBehaviour = global.LCHComposeBehaviour || {})));
}(this, (function (exports) { 'use strict';

	let moi = {};

	//# PROPERTIES

	//_ propertiesCustomMemberObjects

	let LCHComposeBehaviourCustomMemberObjects;

	moi.propertiesCustomMemberObjects = function (inputData) {
		if (typeof inputData === 'undefined') {
			return LCHComposeBehaviourCustomMemberObjects;
		}

		LCHComposeBehaviourCustomMemberObjects = inputData;

		moi.reactMemberObjects(LCHComposeBehaviourCustomMemberObjects);
		moi.reactModelChanged();
	};

	//_ propertiesIdentifiersVisible

	moi.propertiesIdentifiersVisible = function (inputData) {
		if (typeof inputData === 'undefined') {
			return d3.select('#LCHComposeList').classed('LCHComposeListIdentifiersVisible');
		}

		d3.select('#LCHComposeList')
			.classed('LCHComposeListIdentifiersVisible', inputData);
	};

	//# INTERFACE

	//_ interfaceIdentifierVisibilityButtonDidClick

	moi.interfaceIdentifierVisibilityButtonDidClick = function () {
		moi.propertiesIdentifiersVisible(!moi.propertiesIdentifiersVisible());
	};

	//_ interfaceAddButtonDidClick

	moi.interfaceAddButtonDidClick = function () {
		moi.actionMembersCreate();
	};

	//# ACTION

	//_ actionMembersCreate

	moi.actionMembersCreate = function () {
		moi.propertiesCustomMemberObjects(moi.propertiesCustomMemberObjects().concat({
			id: `XYZ${Date.now()}`,
		}));
	};

	//_ actionMembersCollapse

	moi.actionMembersCollapse = function (inputData) {
		inputData.LCHComposeCollapsed = true;

		moi.reactMemberCollapsed(inputData);
	};

	//_ actionMembersReveal

	moi.actionMembersReveal = function (inputData) {
		delete inputData.LCHComposeCollapsed;

		moi.reactMemberCollapsed(inputData);
	};

	//_ actionMembersDelete

	moi.actionMembersDelete = function (inputData) {
		if (!window.confirm(OLSKLocalized('LCHComposeListItemDeletePromptText'))) {
			return;
		}

		inputData.LCHComposeEditor.toTextArea();

		moi.propertiesCustomMemberObjects(moi.propertiesCustomMemberObjects().filter(function (e) {
			return e !== inputData;
		}));
	};

	//# REACT

	//_ reactMemberObjects

	moi.reactMemberObjects = function LCHComposeBehaviourMembersJoin(memberObjects) {
		let selection = d3.select('#LCHComposeList').selectAll('.LCHComposeListItem').data(memberObjects);
		
		let parentElement = selection.enter().append('div')
			.attr('class', 'LCHComposeListItem');

		let toolbarElement = parentElement.append('div')
			.attr('class', 'LCHComposeListItemToolbar');

		toolbarElement.append('hr')

		toolbarElement.append('button')
			.attr('class', 'LCHComposeListItemToolbarCollapseButton')
			.text(OLSKLocalized('LCHComposeListItemToolbarCollapseButtonText'));

		toolbarElement.append('button')
			.attr('class', 'LCHComposeListItemToolbarRevealButton')
			.text(OLSKLocalized('LCHComposeListItemToolbarRevealButtonText'));

		toolbarElement.append('button')
			.attr('class', 'LCHComposeListItemToolbarDeleteButton')
			.text(OLSKLocalized('LCHComposeListItemToolbarDeleteButtonText'));

		let contentElement = parentElement.append('div')
			.attr('class', 'LCHComposeListItemForm');

		contentElement.append('input')
			.attr('class', 'LCHComposeListItemInput LCHComposeListItemInputID')
			.attr('placeholder', OLSKLocalized('LCHComposeListItemInputIDPlaceholder'))
			.attr('autofocus', moi.propertiesIdentifiersVisible() ? '' : undefined)
			.on('input', function (obj) {
				obj.id = this.value;
			});

		contentElement.append('input')
			.attr('class', 'LCHComposeListItemInput LCHComposeListItemInputName')
			.attr('autofocus', !moi.propertiesIdentifiersVisible() ? '' : undefined)
			.attr('placeholder', OLSKLocalized('LCHComposeListItemInputNamePlaceholder'));

		contentElement.append('textarea')
			.attr('class', 'LCHComposeListItemInputFunctionBody')
			.each(function (obj) {
				obj.LCHComposeEditor = CodeMirror.fromTextArea(this, {
					mode: 'javascript',
					lineNumbers: true,
					lineWrapping: true,

					placeholder: OLSKLocalized('LCHComposeListItemInputFunctionBodyPlaceholder'),
					
					extraKeys: {
						// Esc: function () {
						// 	return document.querySelector('button').focus();
						// },
					},
				})

				obj.LCHComposeEditor.on('change', function (instance, changeObject) {
					// if (changeObject.origin === 'setValue') {
					// 	return;
					// }

					// moi.actionsConvertData(instance.getValue());
				});
			});

		parentElement = parentElement.merge(selection);

		parentElement.select('.LCHComposeListItemToolbarRevealButton')
			.on('click', function (obj) {
				moi.actionMembersReveal(obj);
			});

		parentElement.select('.LCHComposeListItemToolbarCollapseButton')
			.on('click', function (obj) {
				moi.actionMembersCollapse(obj);
			});

		parentElement.select('.LCHComposeListItemToolbarDeleteButton')
			.on('click', function (obj) {
				moi.actionMembersDelete(obj);
			});

		parentElement.select('.LCHComposeListItemInputID')
			.property('value', function (obj) {
				return obj.id;
			});

		parentElement.select('.LCHComposeListItemInputName')
			.property('value', function (obj) {
				return obj.name;
			});

		parentElement.select('.LCHComposeListItemInputFunctionBody')
			.each(function (obj) {
				obj.LCHComposeEditor.setValue((obj.fnbody || '').toString());
			});

		parentElement.select('.LCHComposeListItemToolbarDeleteButton')
			.on('click', function (obj) {
				// d3.selectAll('.LCHComposeListItem').filter(function (obj2) {
				// 	return obj2 === obj;
				// }).classed('LCHComposeListItemExit', true);
				moi.actionMembersDelete(obj);
			});

		// parentElement
		// 	.text(function(obj) {
		// 		return obj.name;
		// 	});

		selection.exit().remove();
	};

	//_ reactMemberCollapsed

	moi.reactMemberCollapsed = function (memberObject) {
		d3.selectAll('.LCHComposeListItem')
			.classed('LCHComposeListItemCollapsed', function (obj) {
				return obj.LCHComposeCollapsed;
			});
	};

	//_ reactModelChanged

	moi.reactModelChanged = function () {
		console.trace();

		d3.select('#LCHComposeComposedSample')
			.property('value', LCHCompile.LCHBookmarkletTextForReplacementHash(LCHCompile.LCHBoomarkletReplacementHashFor(moi.propertiesCustomMemberObjects().map(function (e) {
				let sanitized = Object.assign({}, e);

				delete sanitized.LCHComposeEditor;

				return sanitized;
			}))));

		d3.select('#LCHComposeBinary')
			.property('value', LCHCompile.LCHBookmarkletBinaryFor(d3.select('#LCHComposeComposedSample').property('value')));

		d3.select('#LCHComposeBuildLink')
			.property('href', d3.select('#LCHComposeBinary').property('value'))
	};

	//# SETUP

	//_ setupEverything

	moi.setupEverything = function () {
		moi.setupListItems();
		moi.setupDragAndDrop();
	};

	//_ setupListItems

	moi.setupListItems = function () {
		moi.propertiesCustomMemberObjects([
			{
				id: OLSKLocalized('LCHComposeSampleMemberID'),
				fnbody: OLSKLocalized('LCHComposeSampleMemberFNBody'),
				name: OLSKLocalized('LCHComposeSampleMemberName'),
			},
		]);
	};

	//_ setupDragAndDrop

	moi.setupDragAndDrop = function () {
		dragula([document.getElementById('LCHComposeList')]);
	};

	//# LIFECYCLE

	//_ lifecyclePageWillLoad

	moi.lifecyclePageWillLoad = function () {
		moi.setupEverything();
	};

	Object.assign(exports, moi);

	Object.defineProperty(exports, '__esModule', { value: true });

})));
