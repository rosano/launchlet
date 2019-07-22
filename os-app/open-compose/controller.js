//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHComposeNewRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'view'), {
					LCHComposeNormalizeStyle: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../_shared/_external/normalize.css/normalize.css'), 'utf8'),
					LCHComposeBookmarkletStyle: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../dev-bookmarklet/_compiled/ui-style.css'), 'utf8'),
					LCHComposeBookmarkletBehaviour: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../dev-bookmarklet/_compiled/ui-behaviour.js'), 'utf8'),
					LCHDropboxAppKey: Buffer.from(process.env.LCH_DROPBOX_APP_KEY).toString('base64'),					
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
