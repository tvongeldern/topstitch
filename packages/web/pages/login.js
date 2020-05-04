import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { LoginForm } from '@forms';
import { logIn } from '@state/actions';
import { useSelector, useSubmit } from '@utils/hooks';

function loginPageSelector({ auth: { me } }) {
	return { me };
}

export default function LoginPage() {
	const [submitLogIn] = useSubmit(logIn);
	return (
		<Page title="Log in">
			<Form
				component={LoginForm}
				onSubmit={submitLogIn}
			/>
		</Page>
	);
}
