import { deriveOffsets } from './deriveOffsets';
import { deriveViewBox } from './deriveViewBox';
import { drawGarment } from './drawGarment';
import { drawMeasurements } from './drawMeasurements';
import { deriveCoordinates } from './deriveCoordinates';

export class Shirt {
	static deriveOffsets = deriveOffsets;
	static deriveViewBox = deriveViewBox;
	static drawGarment = drawGarment;
	static drawMeasurements = drawMeasurements;
	static deriveCoordinates = deriveCoordinates;
}
