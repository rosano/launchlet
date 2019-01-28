//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHComposeRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'view'), {
					OLSKPagePublicLocalizedStringKeys: [
						'LCHComposeSampleMemberID',
						'LCHComposeSampleMemberName',
						'LCHComposeSampleMemberFNBody',
						'LCHComposeListItemToolbarCollapseButtonText',
						'LCHComposeListItemToolbarRevealButtonText',
						'LCHComposeListItemToolbarDeleteButtonText',
						'LCHComposeListItemDeletePromptText',
						'LCHComposeListItemInputIDPlaceholder',
						'LCHComposeListItemInputNamePlaceholder',
						'LCHComposeListItemInputFunctionBodyPlaceholder',
					],
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
