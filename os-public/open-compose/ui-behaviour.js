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

	moi.reactMemberObjects = function (memberObjects) {
		let selection = d3.select('#LCHComposeList').selectAll('.LCHComposeListItem').data(memberObjects);
		
		let parentElement = selection.enter().append('div')
			.attr('class', 'LCHComposeListItem');

		parentElement.append('input')
			.attr('class', 'LCHComposeListItemInputID');

		parentElement.append('textarea')
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

		parentElement.append('hr');

		parentElement.append('input')
			.attr('class', 'LCHComposeListItemInputName');

		parentElement.append('p').append('button')
			.attr('class', 'LCHComposeListItemDeleteButton');

		parentElement = parentElement.merge(selection);

		parentElement.select('.LCHComposeListItemInputID')
			.attr('placeholder', OLSKLocalized('LCHComposeListItemInputIDPlaceholder'));

		parentElement.select('.LCHComposeListItemInputName')
			.attr('placeholder', OLSKLocalized('LCHComposeListItemInputNamePlaceholder'));

		parentElement.select('.LCHComposeListItemDeleteButton')
			.text(OLSKLocalized('LCHComposeListItemDeleteButtonText'))
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
				fn: function XYZGreet () {
					window.prompt('Hello');
				},
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
