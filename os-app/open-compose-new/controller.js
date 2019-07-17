//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHComposeNewRoute: {
			OLSKRoutePath: '/compose',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'view'), {
					LCHComposeStyleContent: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../open-pendext/', 'sample.css'), 'utf8'),
					LCHComposeLibraryD3Content: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../open-pendext/_external/d3-selection/dist/d3-selection.min.js'), 'utf8'),
					LCHDropboxAppKey: Buffer.from(process.env.LCH_DROPBOX_APP_KEY).toString('base64'),					
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
