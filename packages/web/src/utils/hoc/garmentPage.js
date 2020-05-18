import React, { useState } from 'react';
import {
	FixedWrapContainer,
	GarmentSegmentsView,
	Page,
	SegmentsBrowser,
} from '@components';
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
		if (!garment || !segments) {
			return <Page error="Garment not found" />;
		}
		// first segment in list is default selected
		const [{ propName: defaultSelected }] = segments;
		const [selectedSegment, setSelectedSegment] = useState(defaultSelected);
		const segmentHoverHandler = (event = {}) => {
			setSelectedSegment(event?.target?.dataset?.propname);
			event.stopPropagation();
		};
		const svgHeader=garment.name;
		const textHeader = 'Measurements';
		return (
			<Page title={garment.name}>
				<FixedWrapContainer>
					<GarmentSegmentsView
						builder={Component}
						selectedSegment={selectedSegment}
					/>
					<SegmentsBrowser
						onHover={segmentHoverHandler}
						segments={segments}
						selectedSegment={selectedSegment}
					/>
				</FixedWrapContainer>
			</Page>
		);
	};

	GarmentPage.populate = [getGarment, getGarmentSegments];
	GarmentPage.provide = { slug };

	return GarmentPage;
}
