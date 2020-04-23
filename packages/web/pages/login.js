import React from 'react';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { LoginForm } from '@forms';
import { logIn } from '@state/actions';
import { useSubmit } from '@utils/hooks';

function fakeSubmit() {
	return new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function LoginPage() {
	const [submitLogIn] = useSubmit(logIn);
	return (
		<Page title="Log in">
			<Form
				component={LoginForm}
				onSubmit={fakeSubmit}
			/>
		</Page>
	);
}
