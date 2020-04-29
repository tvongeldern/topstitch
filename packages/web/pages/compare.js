import { Page, GarmentComparisonView } from '@components';
import { TShirt } from '@garment-builders';

const MEASUREMENT_SETS = [
	{
		name: 'My tailored shirt',
		tag: 'myfit11',
		measurements: {
			chestWidth: 764,
		},
	},
	{
		name: 'Bonobos Slim Fit Medium',
		tag: 'bonobos',
		measurements: {
			chestWidth: 690,
		},
	},
];

export default function Compare() {
	return (
		<Page>
			<GarmentComparisonView
				builder={TShirt}
				measurementSets={MEASUREMENT_SETS}
			/>
		</Page>
	);
}
