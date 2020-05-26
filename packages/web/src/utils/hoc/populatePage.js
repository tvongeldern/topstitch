import Router from 'next/router';
import { getMe } from '@state/auth';
import qs from 'querystring';

const LOGIN_PATH = '/login';

function returnError(error) {
	return { error };
}

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

function redirect({
	query,
	asPath,
	pathname,
	res,
}) {
	const redirectQuery = {
		...query,
		asPath,
		pathname,
	};

	if (res) {
		return res.writeHead(302,{
			Location: `${LOGIN_PATH}?${qs.stringify(redirectQuery)}`,
		}).end();
	}

	return Router.push({
		pathname: LOGIN_PATH,
		query: redirectQuery,
	});
}

export function populatePage(Container) {
	const {
		populate = [],
		provide = {},
	} = Container;

	const { getInitialProps = placeholderGetInitialProps } = Container;

	Container.getInitialProps = async function _getInitialProps(providedProps) {
		const {
			query,
			store: { dispatch },
			res,
			pathname,
			asPath,
		} = providedProps;
		// Redirect for private routes
		if (Container.private) {
			const { error } = await dispatch(getMe()).catch(returnError);
			if (error) {
				return redirect({
					query,
					asPath,
					pathname,
					res,
				});
			}
		}
		//
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
