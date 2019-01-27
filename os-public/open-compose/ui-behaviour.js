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
	};

	//# INTERFACE

	//_ interfaceAddButtonDidClick

	moi.interfaceAddButtonDidClick = function () {
		moi.actionNewMemberObject();
	};

	//# ACTION

	//_ actionNewMemberObject

	moi.actionNewMemberObject = function () {
		moi.propertiesCustomMemberObjects(moi.propertiesCustomMemberObjects().concat({}));
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
			.attr('class', 'LCHComposeListItemContent');

		contentElement.append('input')
			.attr('class', 'LCHComposeListItemInputID')
			.on('input', function (obj) {
				obj.id = this.value;
			});

		contentElement.append('textarea')
			.attr('class', 'LCHComposeListItemInputFunction')
			.each(function (obj) {
				obj.LCHComposeEditor = CodeMirror.fromTextArea(this, {
					mode: 'javascript',
					lineNumbers: true,
					lineWrapping: true,
					
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

		contentElement.append('hr');

		contentElement.append('input')
			.attr('class', 'LCHComposeListItemInputName');

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
			.attr('placeholder', OLSKLocalized('LCHComposeListItemInputIDPlaceholder'))
			.property('value', function (obj) {
				return obj.id;
			});

		parentElement.select('.LCHComposeListItemInputFunction')
			.each(function (obj) {
				obj.LCHComposeEditor.setValue((obj.fnbody || '').toString());
			});

		parentElement.select('.LCHComposeListItemInputName')
			.attr('placeholder', OLSKLocalized('LCHComposeListItemInputNamePlaceholder'))
			.property('value', function (obj) {
				return obj.name;
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
				id: 'XYZGreet',
				fnbody: `window.prompt('Hello');`,
				name: 'Greet',
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
