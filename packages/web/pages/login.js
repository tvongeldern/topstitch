import React, { useEffect } from 'react';
import { string } from 'prop-types';
import Router from 'next/router';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { LoginForm } from '@forms';
import { logIn } from '@state/actions';
import { useSelector, useSubmit } from '@utils/hooks';

function loginPageSelector({ auth: { me } }) {
	return { me };
}

export default function LoginPage({ ...redirect }) {
	const [submitLogIn] = useSubmit(logIn);
	const { me } = useSelector(loginPageSelector);
	useEffect(() => {
		if (me) {
			Router.push(redirect);
		}
	}, [!me])
	return (
		<Page title="Log in">
			<Form
				component={LoginForm}
				onSubmit={submitLogIn}
			/>
		</Page>
	);
}

LoginPage.propTypes = {
	pathname: string,
};

LoginPage.defaultProps = {
	pathname: '/',
};
