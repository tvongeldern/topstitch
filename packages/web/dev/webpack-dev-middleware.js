function webpackDevMiddleware(config) {
	return {
		...config,
		poll: 1000,
		aggregateTimeout: 300,
	};
}

module.exports = { webpackDevMiddleware };
