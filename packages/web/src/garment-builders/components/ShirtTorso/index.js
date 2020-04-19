import { deriveOffsets } from './deriveOffsets';
import { deriveMeasurements } from './deriveMeasurements';
import { drawGarment } from './drawGarment';
import { drawMeasurements } from './drawMeasurements';
import { deriveCoordinates } from './deriveCoordinates';

export class ShirtTorso {
	static deriveOffsets = deriveOffsets;
	static deriveMeasurements = deriveMeasurements;
	static drawGarment = drawGarment;
	static drawMeasurements = drawMeasurements;
	static deriveCoordinates = deriveCoordinates;
}
