import React, { useEffect } from 'react';
import { string } from 'prop-types';
import Router from 'next/router';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { LoginForm } from '@forms';
import { getMe, logIn } from '@state/actions';
import {
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils/hooks';

function loginPageSelector({
	auth: {
		cognitoUser,
		me,
	},
}) {
	return {
		cognitoUser,
		me,
	};
}

export default function LoginPage({ ...redirect }) {
	const [dispatchGetMe] = useActionCreators(getMe);
	const [submitLogIn] = useSubmit(logIn);
	const { cognitoUser, me } = useSelector(loginPageSelector);

	useEffect(() => {
		if (me) {
			Router.push(redirect);
		}
	}, [!me]);

	useEffect(() => {
		if (cognitoUser) {
			dispatchGetMe();
		}
	}, [cognitoUser]);

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
