const kLCHServiceWorkerVersionID = process.env.HEROKU_SLUG_COMMIT || Date.now();

//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHServiceWorkerRoute: {
			OLSKRoutePath: '/sw.js',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.type('js').render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'view.ejs'), {
					LCHServiceWorkerVersionID: kLCHServiceWorkerVersionID,
				});
			},
		},
	};
};
