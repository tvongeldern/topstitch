import React from 'react';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { LoginForm } from '@forms';
import { } from '@state/actions';

export default function LoginPage() {
	return (
		<Page title="Log in">
			<Form
				component={LoginForm}
				onSubmit={console.log}
			/>
		</Page>
	);
}
