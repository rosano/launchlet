(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHComposeBehaviour = global.LCHComposeBehaviour || {})));
}(this, (function (exports) { 'use strict';

	let moi = {};

	//# PROPERTIES

	//_ propertiesLocalStorageCustomMemberObjects

	moi.propertiesLocalStorageCustomMemberObjects = function (inputData) {
		if (typeof inputData === 'undefined') {
			return JSON.parse(localStorage.getItem('lch_compose_behaviour_custom_member_objects'));
		}

		localStorage.setItem('lch_compose_behaviour_custom_member_objects', JSON.stringify(inputData));
	};

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
			return d3x.select('#LCHComposeList').classed('LCHComposeListIdentifiersVisible');
		}

		d3x.select('#LCHComposeList')
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

	moi.reactMemberObjects = function (memberObjects) {
		let selection = d3x.select('#LCHComposeList').selectAll('.LCHComposeListItem').data(memberObjects);
		
		let parentElement = selection.enter().append('div')
			.attr('class', 'LCHComposeListItem');

		(function joinEnter () {

			// Toolbar

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

			// Form

			let contentElement = parentElement.append('div')
				.attr('class', 'LCHComposeListItemForm');

			contentElement.append('input')
				.attr('class', 'LCHComposeListItemFormInput LCHComposeListItemFormInputID')
				.attr('placeholder', OLSKLocalized('LCHComposeListItemFormInputIDPlaceholder'))
				.attr('autofocus', moi.propertiesIdentifiersVisible() ? '' : undefined)
				.on('input', function (obj) {
					obj.id = this.value;

					moi.reactModelChanged();
				});

			contentElement.append('input')
				.attr('class', 'LCHComposeListItemFormInput LCHComposeListItemFormInputName')
				.attr('autofocus', !moi.propertiesIdentifiersVisible() ? '' : undefined)
				.attr('placeholder', OLSKLocalized('LCHComposeListItemFormInputNamePlaceholder'))
				.on('input', function (obj) {
					obj.name = this.value;

					moi.reactModelChanged();
				});

			let commandElement = contentElement.append('div')
				.attr('class', 'LCHComposeListItemFormCommand');

			let headElement = commandElement.append('div')
				.attr('class', 'LCHComposeListItemFormCommandHead');

			headElement.append('span')
				.text('function (')

			headElement.append('input')
				.attr('class', 'LCHComposeListItemFormCommandHeadArgsInput')
				.attr('placeholder', 'undefined')
				.on('input', function (obj) {
					obj.args = this.value;

					moi.reactModelChanged();
				});

			headElement.append('span')
				.text(') {')

			commandElement.append('textarea')
				.attr('class', 'LCHComposeListItemFormInputFunctionBody')
				.each(function (obj) {
					obj.LCHComposeEditor = CodeMirror.fromTextArea(this, {
						mode: 'javascript',
						lineNumbers: true,
						lineWrapping: true,

						placeholder: OLSKLocalized('LCHComposeListItemFormInputFunctionBodyPlaceholder'),
						
						extraKeys: {
							// Esc: function () {
							// 	return document.querySelector('button').focus();
							// },
						},
					});

					obj.LCHComposeEditor.on('change', function (instance, changeObject) {
						// if (changeObject.origin === 'setValue') {
						// 	return;
						// }

						obj.fnbody = obj.LCHComposeEditor.getValue();

						moi.reactModelChanged();
					});
				});

			commandElement.append('div')
				.attr('class', 'LCHComposeListItemFormCommandTail')
				.append('span')
					.text('}');
		})();

		parentElement = parentElement.merge(selection);

		(function joinUpdate () {

			// Toolbar
			
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

			// Form

			parentElement.select('.LCHComposeListItemFormInputID')
				.property('value', function (obj) {
					return obj.id;
				});

			parentElement.select('.LCHComposeListItemFormInputName')
				.property('value', function (obj) {
					return obj.name;
				});

			parentElement.select('.LCHComposeListItemFormCommandHeadArgsInput')
				.property('value', function (obj) {
					return obj.args;
				});

			parentElement.select('.LCHComposeListItemFormInputFunctionBody')
				.each(function (obj) {
					obj.LCHComposeEditor.setValue((obj.fnbody || '').toString());
				});

			parentElement.select('.LCHComposeListItemToolbarDeleteButton')
				.on('click', function (obj) {
					// d3x.selectAll('.LCHComposeListItem').filter(function (obj2) {
					// 	return obj2 === obj;
					// }).classed('LCHComposeListItemExit', true);
					moi.actionMembersDelete(obj);
				});
		})();

		selection.exit().remove();

		moi.reactMemberCollapsed();
	};

	//_ reactMemberCollapsed

	moi.reactMemberCollapsed = function (memberObject) {
		d3x.selectAll('.LCHComposeListItem')
			.classed('LCHComposeListItemCollapsed', function (obj) {
				return obj.LCHComposeCollapsed;
			});
	};

	//_ reactModelChanged

	moi.reactModelChanged = function () {
		let sanitizedMemberObjects = moi.propertiesCustomMemberObjects().map(function (e) {
			let obj = Object.assign({}, e);

			delete obj.LCHComposeEditor;

			return obj;
		});
		let bookmarklet = LCHCompile.LCHBookmarkletTextForTokenHash(LCHCompile.LCHTokenHashFor({
			LCHInputMemberObjects: sanitizedMemberObjects.filter(function (e) {
				return !!e.fnbody;
			}).map(LCHCompile.LCHWrappedMemberObjectFor),
			LCHInputStyleContent: d3x.select('#LCHComposeStyleContent').text(),
			LCHInputLibraryD3Content: d3x.select('#LCHComposeLibraryD3Content').text(),
		}));

		d3x.select('#LCHComposeComposedSample')
			.property('value', bookmarklet);

		d3x.select('#LCHComposeBinary')
			.property('value', LCHCompile.LCHBookmarkletBinaryFor(bookmarklet));

		d3x.select('#LCHComposeBuildLink')
			.property('href', d3x.select('#LCHComposeBinary').property('value'));

		d3x.select('#LCHComposeBuildScript script').remove();
		d3x.select('#LCHComposeBuildScript').append('script')
			.html(`LCHComposeBuildScript = ${ bookmarklet }`);

		moi.propertiesLocalStorageCustomMemberObjects(sanitizedMemberObjects);

		return;

		// let editor = CodeMirror.fromTextArea(d3x.select('#LCHComposeComposedSample').node(), {
		// 	mode: 'javascript',
		// 	lineNumbers: true,
		// 	lineWrapping: true,
		// });

		// editor.on('change', function (instance, changeObject) {
		// 	d3x.select('#LCHComposeBinary')
		// 		.property('value', LCHCompile.LCHBookmarkletBinaryFor(instance.getValue()));

		// 	d3x.select('#LCHComposeBuildLink')
		// 		.property('href', d3x.select('#LCHComposeBinary').property('value'));

		// 	d3x.select('#LCHComposeBuildScript script').remove();
		// 	d3x.select('#LCHComposeBuildScript').append('script')
		// 		.html(`LCHComposeBuildScript = ${ instance.getValue() }`);
		// });

		// editor.setValue(bookmarklet);
	};

	//# SETUP

	//_ setupEverything

	moi.setupEverything = function () {
		moi.setupListItems();
		moi.setupDragAndDrop();
	};

	//_ setupListItems

	moi.setupListItems = function () {
		moi.propertiesCustomMemberObjects(moi.propertiesLocalStorageCustomMemberObjects() || [
			{
				id: OLSKLocalized('LCHComposeSampleMemberID'),
				fnbody: OLSKLocalized('LCHComposeSampleMemberFNBody'),
				name: OLSKLocalized('LCHComposeSampleMemberName'),
			},
		]);
	};

	//_ setupDragAndDrop

	moi.setupDragAndDrop = function () {
		dragula([document.getElementById('LCHComposeList')]).on('drop', function () {
			moi.reactModelChanged();
		});
	};

	//# LIFECYCLE

	//_ lifecyclePageWillLoad

	moi.lifecyclePageWillLoad = function () {
		moi.setupEverything();
	};

	Object.assign(exports, moi);

	Object.defineProperty(exports, '__esModule', { value: true });

})));
