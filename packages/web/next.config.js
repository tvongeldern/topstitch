const compose = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withScss = require('@zeit/next-sass');
const withImages = require('next-images');
const { webpackDevMiddleware } = require('./dev/webpack-dev-middleware');

const config = {
	webpackDevMiddleware,
	publicRuntimeConfig: {
		CLIENT_API_HOST: process.env.CLIENT_API_HOST,
		DOCKER_API_HOST: process.env.DOCKER_API_HOST,
		S3_BUCKET: process.env.S3_BUCKET,
		cognito: {
			region: process.env.COGNITO_REGION,
			userPoolId: process.env.COGNITO_POOL_ID,
			userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID,
		},
		cookies: {
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
		},
	},
};

module.exports = compose([
	[withCss],
	[
		withScss,
		{
			cssModules: true,
			sassLoaderOptions: {
				includePaths: [
					'src/constants/styles',
					'src/components',
				],
			},
		},
	],
	[withImages],
], config);