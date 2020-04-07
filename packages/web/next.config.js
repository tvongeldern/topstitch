const compose = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withScss = require('@zeit/next-sass');
const withImages = require('next-images');
const { webpackDevMiddleware } = require('./dev/webpack-dev-middleware');

module.exports = compose([
	[withCss],
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
], { webpackDevMiddleware });