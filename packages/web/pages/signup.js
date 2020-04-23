import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import Router from 'next/router';
import { Page } from '@components';
import { SignupForm } from '@forms';
import { createAccount, signUp } from '@state/actions';
import {
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils/hooks';

function signupPageSelector({
	auth: {
		cognitoUser,
		me,
	}
}) {
	return {
		cognitoUser,
		me,
	};
}

export default function LoginPage() {
	const [submitSignUp] = useSubmit(signUp);
	const [dispatchCreateAccount] = useActionCreators(
		createAccount,
	);
	const { cognitoUser, me } = useSelector(
		signupPageSelector,
	);
	// Dispatch actions based on signup status
	useEffect(() => {
		if (me) {
			Router.push('/');
		} else if (cognitoUser) {
			dispatchCreateAccount();
		}
	}, [!me, !cognitoUser]);
	return (
		<Page title="Sign up">
			<Form
				component={SignupForm}
				onSubmit={submitSignUp}
			/>
		</Page>
	);
}
