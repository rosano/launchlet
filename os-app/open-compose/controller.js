//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHComposeRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'view'), {
					LCHComposeLauncherStyle: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../dev-launcher/_compiled/ui-style.css'), 'utf8'),
					LCHComposeLauncherBehaviour: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../dev-launcher/_compiled/ui-behaviour.js'), 'utf8'),
					LCHDropboxAppKey: Buffer.from(process.env.LCH_DROPBOX_APP_KEY).toString('base64'),					
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
