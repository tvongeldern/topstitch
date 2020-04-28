import { Form } from 'react-final-form';
import { Page } from '@components';
import { Sizechart } from '@forms';
import { useSubmit } from '@utils/hooks';

const sizechart = {
	id: "c6112d01-de5b-41df-bfb6-2cd0b952c632",
	name: "Brand 1588073584009",
	collections: [
		{
			id: "fa97b922-a8a1-4a13-a3c0-d296940be6c4",
			name: "Mens",
			garments: [
				{
					id: "7e9fb310-f2c7-437d-bc54-7bce9f165aa7",
					name: "Shirt 1588073584009",
					fits: [
						{
							id: "46c59622-1f6f-444d-a9c5-51aa423c7a68",
							name: "Fit",
							sizes: [
								{
									id: "0d1a775d-564f-4af6-9f6c-2ddc3ee999a6",
									name: "Medium",
									measurements: [
										{
											average: 39,
											id: "3e237533-8664-44c9-aaf0-e950ac315458",
											segment: {
												id: "694b5e0d-5079-4390-b7a3-9f8de2fa484a",
												name: "Hip"
											}
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			id: "fa97b922-a8a1-4a13-a3c0-d2969408bcc4",
			name: "Womens",
		}
	]
};

export default function SizechartsPage() {
	return (
		<Page title="Sizecharts">
			<Form
				component={Sizechart}
				onSubmit={console.log}
				onChange={console.log}
				sizechart={sizechart}
			/>
		</Page>
	);
}
