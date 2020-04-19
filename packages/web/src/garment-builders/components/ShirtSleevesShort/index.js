import { deriveCoordinates } from './deriveCoordinates';
import { deriveMeasurements } from './deriveMeasurements';
import { deriveOffsets } from './deriveOffsets';
import { drawGarment } from './drawGarment';
import { drawMeasurements } from './drawMeasurements';

export class ShirtSleevesShort {
	static deriveCoordinates = deriveCoordinates;
	static deriveMeasurements = deriveMeasurements;
	static deriveOffsets = deriveOffsets;
	static drawGarment = drawGarment;
	static drawMeasurements = drawMeasurements;
}
