import { Page, GarmentSegmentsView } from '@components';
import { getGarment, getGarmentSegments } from '@state/actions';
import { useSelector } from '@utils/hooks';

function garmentPageSelectorCreator(slug) {
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

export function garmentPage(slug, Component) {
	const selector = garmentPageSelectorCreator(slug);
	function GarmentPage() {
		const { garment, segments } = useSelector(selector);
		return (
			<Page>
				{garment && segments ? (
					<GarmentSegmentsView
						builder={Component}
						garment={garment}
						segments={segments}
					/>) : (
						<h2>Garment not found</h2>
					)}
			</Page>
		);
	};

	GarmentPage.populate = [getGarment, getGarmentSegments];
	GarmentPage.provide = { slug };

	return GarmentPage;
}
