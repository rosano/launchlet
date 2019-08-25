(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.RSModuleProtocol_lch_settings = global.RSModuleProtocol_lch_settings || {})));
}(this, (function (exports) { 'use strict';

	const RSModuleShared = typeof require === 'undefined' ? window.RSModuleShared : require('../_shared/main.js');
	const LCHSettingsModel = typeof require === 'undefined' ? window.LCHSettingsModel : require('./model.js');

	exports.RSModuleProtocolModuleForChangeDelegate = function () {
		return {
			name: 'lch_settings',
			builder: function(privateClient, publicClient) {
				privateClient.declareType('lch_setting', RSModuleShared.RSModuleSharedJSONSchemaForErrors(LCHSettingsModel.LCHSettingsModelErrorsFor({})));

				return {
					exports: {
						init: function () {
							return privateClient.cache('');
						},
						listObjects: function () {
							return privateClient.getAll('');
						},
						writeObject: async function (param1, param2) {
							await privateClient.storeObject('lch_setting', param1, param2);
							return param2;
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
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
