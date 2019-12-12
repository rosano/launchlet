const kLCHServiceWorkerVersionID = process.env.HEROKU_SLUG_COMMIT || Date.now();

const OLSKServiceWorker = require('../_shared/__external/OLSKServiceWorker/main.js');

exports.OLSKControllerRoutes = function() {
	return {
		LCHServiceWorkerRoute: {
			OLSKRoutePath: '/sw.js',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.type('js').send(OLSKServiceWorker.OLSKServiceWorkerView({
					VERSION_ID_TOKEN: kLCHServiceWorkerVersionID.toString(),
					REFERRER_MATCH_TOKEN: res.locals.OLSKCanonicalFor('LCHComposeRoute').replace(/\//g, '\\/'),
				}));
			},
		},
	};
};
