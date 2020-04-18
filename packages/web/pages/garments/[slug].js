import { Page, GarmentView } from '@components';
import { Shirt } from '@garment-builders';
import { getGarment, getGarmentSegments } from '@state/actions';
import { useSelectorCreator } from '@utils/hooks';

function garmentPageSelectorCreator({ slug }) {
	return function garmentPageSelector({
		garments: { garments, slugs },
		segments: { segments },
	}) {
		const id = slugs[slug];
		const garment = garments[id];
		return {
			garment,
			segments: Object.values(segments)
				.filter(({ garmentId }) => garmentId === id),
		};
	}
}

export default function GarmentPage({ slug }) {
	const { garment, segments } = useSelectorCreator(
		garmentPageSelectorCreator,
		{ slug },
	);
	return (
		<Page>
			<GarmentView
				component={Shirt}
				garment={garment}
				segments={segments}
			/>
		</Page>
	);
};

GarmentPage.populate = [getGarment, getGarmentSegments];
