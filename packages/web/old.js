{
	"name": "client-web",
		"version": "0.1.0",
			"private": true,
				"scripts": {
		"build": "next build",
			"dev": "next dev",
				"gen": "plop --require @babel/register",
					"analyze": "BUNDLE_ANALYZER_MODE=1 && npm run build",
						"gen:action": "npm run gen -- action",
							"gen:component": "npm run gen -- component",
								"gen:form": "npm run gen -- form",
									"gen:page": "npm run gen -- page",
										"gen:reducer": "npm run gen -- reducer",
											"lint": "npm run lint:js && npm run lint:styles",
												"lint:js": "eslint ./",
													"lint:styles": "stylelint ./src",
														"start": "next start",
															"test": "jest",
																"ip": "ipconfig getifaddr en0"
	},
	"dependencies": {
		"aws-amplify": "^2.2.5",
			"axios": "^0.19.0",
				"chart.js": "^2.9.3",
					"classnames": "^2.2.6",
						"fast-json-stable-stringify": "^2.1.0",
							"final-form": "^4.18.6",
								"js-file-download": "^0.4.10",
									"next": "^9.2.2",
										"next-images": "^1.2.0",
											"next-redux-wrapper": "^4.0.1",
												"node-sass": "^4.13.0",
													"prop-types": "^15.7.2",
														"react": "16.12.0",
															"react-chartjs-2": "^2.9.0",
																"react-compound-slider": "^2.5.0",
																	"react-dom": "16.12.0",
																		"react-final-form": "^6.3.3",
																			"react-redux": "^7.1.3",
																				"react-use-scroll-position": "^2.0.0",
																					"react-visibility-sensor": "^5.1.1",
																						"redux": "^4.0.4",
																							"universal-cookie": "^4.0.3"
	},



	"devDependencies": {
"@babel/register": "^7.8.3",
"@epegzz/sass-vars-loader": "^6.0.0",
"@next/bundle-analyzer": "^9.3.0",
"": "^1.0.1",
"": "^1.0.1",
"": "^10.0.3",
"": "^1.1.0",
"": "^4.0.0",
"": "^4.1.10",
"": "^4.0.7",
"dotenv": "^8.2.0",
"": "^3.11.0",
"": "^1.15.2",
"": "^6.7.2",
"": "^18.0.1",
"": "^5.1.0",
"": "^3.5.1",
"": "^2.19.1",
"": "^23.2.0",
"": "^6.2.3",
"": "^7.17.0",
"": "^1.7.0",
"": "^3.0.0",
"": "^24.9.0",
"": "^7.1.2",
"next-compose-plugins": "^2.2.0",
"plop": "^2.5.4",
"": "^4.0.2",
"": "^4.0.1",
"": "^13.2.0",
"": "^20.0.0",
"": "^4.0.0"
	}
}









require('./platform/plugins/dotenv-plugin');

const composePlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withScss = require('@zeit/next-sass');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withImages = require('next-images');
const sharedConstants = require('./src/constants/sass-js-constants.json');
const zeconomyNextWebpackPlugin = require('./platform/plugins/webpack-plugin');

const SASS_VARS_LOADER = '@epegzz/sass-vars-loader';
const sassVars = Object.entries(sharedConstants)
	.reduce((formatted, [key, value]) => ({
		...formatted,
		[key]: JSON.stringify(value),
	}), {});

function withSassVars(nextConfig = {}) {
	return {
		...nextConfig,
		webpack: (webpackConfig, options) => {
			const updatedWebpackConfig = {
				...webpackConfig,
				module: {
					...webpackConfig.module,
					rules: [
						...webpackConfig.module.rules,
						{
							test: /\.scss$/,
							use: [
								{
									loader: SASS_VARS_LOADER,
									options: {
										syntax: 'scss',
										vars: sassVars,
									},
								},
							],
						},
					],
				},
			};
			return nextConfig.webpack(updatedWebpackConfig, options);
		},
	};
}

const AUTH_TOKEN_COOKIE_NAME = 'zc_jwt';

const config = {
	// build-time config
	env: {
		AUTH_TOKEN_COOKIE_NAME,
	},
	// runtime config
	publicRuntimeConfig: {
		API_HOST: process.env.API_HOST,
		AUTH_TOKEN_COOKIE_NAME,
		LEGACY_WEB_URL: process.env.LEGACY_WEB_URL,
		cognito: {
			Auth: {
				region: process.env.COGNITO_REGION,
				userPoolId: process.env.COGNITO_USER_POOL_ID,
				userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
			},
		},
		cookies: {
			secure: !process.env.COOKIE_NOT_SECURE,
			sameSite: process.env.COOKIE_SAMESITE || 'strict',
			// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Scope_of_cookies
			domain: process.env.COOKIE_DOMAIN,
			path: '/',
		},
	},
	webpack: zeconomyNextWebpackPlugin,
};

const plugins = [
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
	[withBundleAnalyzer({ enabled: !!process.env.BUNDLE_ANALYZER_MODE })],
];

module.exports = composePlugins(plugins, config);







{
	"compilerOptions": {
		"baseUrl": ".",
			"paths": {
			"@*": ["./*", "./src/*"]
		}
	},
	"exclude": ["node_modules", "out", ".next"]
}








{
	"presets": ["next/babel"],
		"plugins": [
			[
				"module-resolver",
				{
					"root": "./",
					"alias": {
						"@assets": "./assets",
						"@components": "./src/components",
						"@constants": "./src/constants",
						"@forms": "./src/forms",
						"@state": "./src/state",
						"@svg": "./assets/svg",
						"@utils": "./src/utils"
					}
				}
			],
			"inline-react-svg"
		]
}


{
	"env": {
		"browser": true,
			"es6": true,
				"node": true,
					"jest/globals": true
	},
	"extends": [
		"plugin:react/recommended",
		"plugin:compat/recommended",
		"airbnb",
		"plugin:jest/style"
	],
		"globals": {
		"Atomics": "readonly",
			"SharedArrayBuffer": "readonly"
	},
	"parser": "babel-eslint",
		"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
			"sourceType": "module"
	},
	"plugins": [
		"react",
		"jest"
	],
		"rules": {
		"camelcase": 0,
			"consistent-return": 1,
				"func-style": [1, "declaration", { "allowArrowFunctions": true }],
					"import/prefer-default-export": 0,
						"import/named": 1,
							"import/no-extraneous-dependencies": ["error", { "devDependencies": ["./platform/*/*", "./*", "./**/*.test.js"] }],
								"indent": [1, "tab"],
									"jsx-a11y/anchor-is-valid": 0,
										"jsx-a11y/anchor-has-content": 0,
											"jsx-a11y/label-has-associated-control": 0,
												"jsx-a11y/click-events-have-key-events": 0,
													"jsx-a11y/no-static-element-interactions": 0,
														"jsx-a11y/accessible-emoji": 0,
															"jsx-a11y/control-has-associated-label": 0,
																"no-confusing-arrow": 0,
																	"no-tabs": 0,
																		"object-curly-newline": 1,
																			"prefer-promise-reject-errors": 0,
																				"react/jsx-filename-extension": 0,
																					"react/jsx-indent": [1, "tab"],
																						"react/jsx-indent-props": [1, "tab"],
																							"react/jsx-props-no-spreading": 0,
																								"react/no-array-index-key": 1,
																									"react/forbid-prop-types": 1,
																										"react/jsx-tag-spacing": 1,
																											"react/button-has-type": 0
	},
	"settings": {
		"import/resolver": {
			"babel-module": { }
		},
		"polyfills": [
			"Uint32Array.from",
			"Array.prototype.find",
			"Array.prototype.includes",
			"Object.entries",
			"Object.values",
			"Promise",
			"String.prototype.includes"
		]
	}
}



{
	"extends": "stylelint-config-standard",
		"plugins": ["stylelint-no-unsupported-browser-features"],
			"ignoreFiles": ["**/*.js", "**/*.json"],
				"rules": {
		"plugin/no-unsupported-browser-features": [true, { "severity": "warning" }],
			"indentation": ['tab', { "severity": "warning" }],
				"property-case": null,
					"at-rule-no-unknown": null,
						"selector-type-no-unknown": true,
							"no-descending-specificity": null,
								"selector-pseudo-class-no-unknown": [true, { "ignorePseudoClasses": ["export"] }]
	}
}


// cssnano.config.js
module.exports = {
	preset: [
		'default',
		{
			calc: false,
			discardOverridden: true,
		},
	],
};


// postcss.config.js
module.exports = () => ({
	plugins: {
		autoprefixer: {},
		'postcss-flexbugs-fixes': {},
		'postcss-discard-duplicates': {},
		'postcss-discard-overridden': {},
		cssnano: {},
	},
});




{
	"presets": ["next/babel"],
		"plugins": [
			[
				"module-resolver",
				{
					"root": "./",
					"alias": {
						"@assets": "./assets",
						"@components": "./src/components",
						"@constants": "./src/constants",
						"@forms": "./src/forms",
						"@state": "./src/state",
						"@svg": "./assets/svg",
						"@utils": "./src/utils"
					}
				}
			],
			"inline-react-svg"
		]
}