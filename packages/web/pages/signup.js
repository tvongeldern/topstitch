import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import Router from 'next/router';
import { Alert, Page } from '@components';
import { SignupForm } from '@forms';
import { createAccount, getMe, signUp } from '@state/actions';
import {
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils/hooks';

function getAlertText({ redirect, as }) {
	if (redirect === '/sizecharts') {
		return 'You need an account to add a sizechart';
	}
	if (redirect === '/sizecharts/[slug]/review') {
		return 'You need an account to add a review';
	}
}

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

export default function SignupPage({
	as,
	redirect = '/',
}) {
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
			Router.push(redirect, as);
		} else if (cognitoUser) {
			dispatchCreateAccount();
		}
	}, [!me, !cognitoUser]);
	return (
		<Page title="Sign up">
			<Alert
				message={getAlertText({ as, redirect })}
			/>
			<Form
				component={SignupForm}
				onSubmit={submitSignUp}
			/>
		</Page>
	);
}
