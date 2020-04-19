import { Page, GarmentComparisonView } from '@components';
import { TShirt } from '@garment-builders';

export default function Compare() {
	return (
		<Page>
			<GarmentComparisonView
				builder={TShirt}
				measurementSets={[
					{
						chestWidth: 764,
					},
					{
						chestWidth: 690,
					},
				]}
			/>
		</Page>
	);
}
