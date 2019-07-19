//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHComposeNewRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'view'), {
					LCHComposeBookmarkletStyle: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../dev-bookmarklet/_compiled/ui-style.css'), 'utf8'),
					LCHComposeBookmarkletBehaviour: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(__dirname, '../dev-bookmarklet/_compiled/ui-behaviour.js'), 'utf8'),
					LCHDropboxAppKey: Buffer.from(process.env.LCH_DROPBOX_APP_KEY).toString('base64'),					
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
