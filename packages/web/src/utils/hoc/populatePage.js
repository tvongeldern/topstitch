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

export function populatePage(Container) {
	const {
		populate = [],
		provide = {}
	} = Container;

	const { getInitialProps = placeholderGetInitialProps } = Container;

	Container.getInitialProps = async function _getInitialProps(providedProps) {
		const {
			query,
			store: { dispatch },
		} = providedProps;
		const provideQuery = QueryProvider({
			...provide,
			...query,
		});
		await Promise.all(
			populate
				.map(provideQuery)
				.map(dispatch),
		);
		return getInitialProps(providedProps);
	};;

	return Container;
}
