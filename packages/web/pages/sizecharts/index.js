import { Form } from 'react-final-form';
import { Page } from '@components';
import { SizechartForm } from '@forms';
import { useSubmit } from '@utils/hooks';

export default function SizechartsPage() {
	return (
		<Page title="Sizecharts">
			<Form
				component={SizechartForm}
				onSubmit={console.log}
			/>
		</Page>
	);
}
