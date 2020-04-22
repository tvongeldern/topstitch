import React from 'react';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { SignupForm } from '@forms';
import { signUp } from '@state/actions';
import { useSubmit } from '@utils/hooks';

export default function LoginPage() {
	const [submitSignUp] = useSubmit(signUp);
	return (
		<Page title="Sign up">
			<Form
				component={SignupForm}
				onSubmit={submitSignUp}
			/>
		</Page>
	);
}
