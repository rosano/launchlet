import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

export const LCHStorageModule = function (inputData) {
	return {
		name: 'launchlet',
		builder: function(privateClient, publicClient) {
			return {
				exports: inputData.reduce(function (coll, item) {
					let storage = item.LCHCollectionStorageGenerator(privateClient, publicClient, item.LCHCollectionChangeDelegate);

					privateClient.declareType(storage.LCHStorageType, OLSKRemoteStorage.OLSKRemoteStorageJSONSchema(storage.LCHStorageModelErrors));

					coll[storage.LCHStorageCollection] = storage.LCHStorageExports;

					return coll;
				}, {}),
			};
		},
	};
};
