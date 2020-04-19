function placeholderGetInitialProps(props) {
	const {
		asPath,
		pathname,
		query,
	} = props;
	return {
		asPath,
		pathname,
		...query,
	};
}

function QueryProvider(query) {
	return function provideQuery(actionOrCreator) {
		return actionOrCreator(query);
	};
}

export function populatePage(Container, context) {
	const { populate, provide = {} } = Container;
	if (!populate) {
		Container.getInitialProps = Container.getInitialProps || placeholderGetInitialProps;
		return Container;
	}
	function _populateFromActions(...actionCreators) {
		const { getInitialProps = placeholderGetInitialProps } = Container;
		return async function _getInitialProps(providedProps) {
			const { query, store: { dispatch } } = providedProps;
			const provideQuery = QueryProvider({
				...provide,
				...query,
			});
			await Promise.all(
				actionCreators
					.map(provideQuery)
					.map(dispatch),
			);
			return getInitialProps(providedProps);
		};
	}
	Container.getInitialProps = _populateFromActions(...populate);
	return Container;
}
