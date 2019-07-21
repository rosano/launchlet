const kLCHServiceWorkerVersionID = process.env.HEROKU_SLUG_COMMIT || Date.now();

const OLSKServiceWorker = require('../_shared/OLSKServiceWorker/main.js')

//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHServiceWorkerRoute: {
			OLSKRoutePath: '/sw.js',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.type('js').send(OLSKServiceWorker.OLSKServiceWorkerViewForVersionID(kLCHServiceWorkerVersionID.toString()));
			},
		},
	};
};
