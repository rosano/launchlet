import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kModuleName = 'launchlet';

export const LCHStorageModule = function (inputData) {
	return {
		name: kModuleName,
		builder: function(privateClient, publicClient) {
			privateClient.cache(`${ kModuleName }/`);

			return {
				exports: inputData.reduce(function (coll, item) {
					let storage = item(privateClient, publicClient, item.LCHStorageChangeDelegate);

					privateClient.declareType(storage.LCHStorageType, OLSKRemoteStorage.OLSKRemoteStorageJSONSchema(storage.LCHStorageModelErrors));

					coll[storage.LCHStorageCollection] = storage.LCHStorageExports;

					return coll;
				}, {}),
			};
		},
	};
};
