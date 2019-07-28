import * as RSModuleShared from '../_shared/main.js';
import * as LCHFormulasModel from './model.js';

export const RSModuleProtocolModuleForChangeDelegate = function (changeDelegate) {
	return {
		name: 'lch_members',
		builder: function(privateClient, publicClient) {
			privateClient.declareType('lch_member', RSModuleShared.RSModuleSharedJSONSchemaForErrors(LCHFormulasModel.LCHFormulasModelErrorsFor({})));

			!changeDelegate ? null : privateClient.on('change', function (event) {
				if (typeof event.oldValue === 'undefined') {
					return typeof changeDelegate.OLSKChangeDelegateAdd === 'function' ? changeDelegate.OLSKChangeDelegateAdd(LCHFormulasModel.LCHFormulasModelPostJSONParse(event.newValue)) : console.warn('OLSKChangeDelegateAdd not function');
				}

				if (typeof event.newValue === 'undefined') {
					return typeof changeDelegate.OLSKChangeDelegateRemove === 'function' ? changeDelegate.OLSKChangeDelegateRemove(event.oldValue) : console.warn('OLSKChangeDelegateRemove not function');
				}

				if (JSON.stringify(event.oldValue) !== JSON.stringify(event.newValue)) {
					return typeof changeDelegate.OLSKChangeDelegateUpdate === 'function' ? changeDelegate.OLSKChangeDelegateUpdate(LCHFormulasModel.LCHFormulasModelPostJSONParse(event.newValue)) : console.warn('OLSKChangeDelegateUpdate not function');
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
						await privateClient.storeObject('lch_member', param1, LCHFormulasModel.LCHFormulasModelPreJSONSchemaValidate(param2));
						return LCHFormulasModel.LCHFormulasModelPostJSONParse(param2);
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
