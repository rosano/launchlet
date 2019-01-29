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
					LCHComposeStyleContent: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(req.OLSKLive.OLSKLivePublicDirectoryAbsolutePath(), res.locals.OLSKSharedPageControllerSlug, 'sample.css'), 'utf8'),
					LCHComposeLibraryD3Content: require('fs').readFileSync(req.OLSKLive.OLSKLivePathJoin(req.OLSKLive.OLSKLivePublicDirectoryAbsolutePath(), res.locals.OLSKSharedPageControllerSlug, 'libraries/d3-selection/dist/d3-selection.min.js'), 'utf8'),
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
