const RSModuleShared = typeof require === 'undefined' ? window.RSModuleShared : require('../_shared/main.js');
const LCHMembersModel = typeof require === 'undefined' ? window.LCHMembersModel : require('./model.js');

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.RSModuleProtocol_lch_members = global.RSModuleProtocol_lch_members || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); Object.assign(exports, {
	RSModuleProtocolModuleForChangeDelegate: function (changeDelegate) {
		return {
			name: 'lch_members',
			builder: function(privateClient, publicClient) {
				privateClient.declareType('lch_member', RSModuleShared.RSModuleSharedJSONSchemaForErrors(LCHMembersModel.LCHMembersModelErrorsFor({})));

				!changeDelegate ? null : privateClient.on('change', function (event) {
					if (typeof event.oldValue === 'undefined') {
						return typeof changeDelegate.OLSKChangeDelegateAdd === 'function' ? changeDelegate.OLSKChangeDelegateAdd(LCHMembersModel.LCHMembersModelPostJSONParse(event.newValue)) : console.warn('OLSKChangeDelegateAdd not function');
					}

					if (typeof event.newValue === 'undefined') {
						return typeof changeDelegate.OLSKChangeDelegateRemove === 'function' ? changeDelegate.OLSKChangeDelegateRemove(event.oldValue) : console.warn('OLSKChangeDelegateRemove not function');
					}

					if (JSON.stringify(event.oldValue) !== JSON.stringify(event.newValue)) {
						return typeof changeDelegate.OLSKChangeDelegateUpdate === 'function' ? changeDelegate.OLSKChangeDelegateUpdate(LCHMembersModel.LCHMembersModelPostJSONParse(event.newValue)) : console.warn('OLSKChangeDelegateUpdate not function');
					}

					console.info(event);
				});

				return {
					exports: {
						init: function () {
							return privateClient.cache('');
						},
						listObjects: function () {
							return privateClient.getAll('');
						},
						writeObject: async function (param1, param2) {
							await privateClient.storeObject('lch_member', param1, LCHMembersModel.LCHMembersModelPreJSONSchemaValidate(param2));
							return LCHMembersModel.LCHMembersModelPostJSONParse(param2);
						},
						readObject: function (inputData) {
							return privateClient.getObject(inputData);
						},
						deleteObject: function (inputData) {
							return privateClient.remove(inputData);
						},
					},
				};
			},
		};
	},
}); })));
