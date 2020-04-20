const CONTENT_TO_BOX_RATIO = 1.2;
export function getViewBox({ height, width }) {
	const boxWidth = width * CONTENT_TO_BOX_RATIO;
	const boxHeight = height * CONTENT_TO_BOX_RATIO;
	const yOffset = boxHeight - height;
	return [
		0 - (boxWidth / 2),
		0 - (height) - (yOffset / 2),
		boxWidth,
		boxHeight,
	].join(' ');
}
