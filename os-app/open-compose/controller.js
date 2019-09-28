exports.OLSKControllerSharedMiddlewares = function() {
	return {
		LCHComposeRouteGuardMiddleware (req, res, next) {
			return next(require('./logic.js').LCHComposeRouteGuard(process.env))
		},
	};
};

exports.OLSKControllerRoutes = function() {
	return {
		LCHComposeRoute: {
			OLSKRoutePath: '/compose',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'ui-view'), {
					LCHComposeLauncherStyle: require('fs').readFileSync(require('path').join(__dirname, '../dev-launcher/__compiled/ui-style.css'), 'utf8'),
					LCHComposeLauncherBehaviour: require('fs').readFileSync(require('path').join(__dirname, '../dev-launcher/__compiled/ui-behaviour.js'), 'utf8'),
					LCHDropboxAppKey: Buffer.from(process.env.LCH_DROPBOX_APP_KEY).toString('base64'),
					LCHGoogleClientKey: Buffer.from(process.env.LCH_GOOGLE_CLIENT_KEY).toString('base64'),
				});
			},
			OLSKRouteLanguages: ['en', 'fr'],
			OLSKRouteMiddlewares: [
				'LCHComposeRouteGuardMiddleware',
			],
		},
	};
};
