import { Garment } from '@utils';
import { deriveOffsets } from './deriveOffsets';
import { deriveViewBox } from './deriveViewBox';
import { drawGarment } from './drawGarment';
import { drawMeasurements } from './drawMeasurements';

export class Shirt {
	static deriveOffsets = deriveOffsets;
	static deriveViewBox = deriveViewBox;
	static drawGarment = drawGarment;
	static drawMeasurements = drawMeasurements;
}
