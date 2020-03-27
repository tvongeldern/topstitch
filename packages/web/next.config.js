const compose = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withScss = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = compose([
	[withCss],
	[withSassVars],
	[
		withScss,
		{
			cssModules: true,
			sassLoaderOptions: {
				includePaths: [
					'src/constants/styles',
					'assets',
				],
			},
		},
	],
	[withImages],
]);
