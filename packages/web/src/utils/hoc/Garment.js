import { drawMeasurements } from '../drawing';
import { calculateSize, shiftCoordinates } from '../geometry';
import { EMPTY_OBJECT, EMPTY_ARRAY } from '@constants';

export class Garment {
	constructor(measurements) {
		this._providedMeasurements = measurements;
		this._useDefaultMeasurements = !measurements;
	}

	measurements() {
		if (!this._measurements) {
			const providedMeasurements = this._useDefaultMeasurements
				? this.defaultMeasurements
				: this._providedMeasurements;
			const derivedMeasurements = this.components.reduce((measurements, Component) => {
				if (!Component.deriveMeasurements) {
					return measurements;
				}
				const componentMeasurements = Component.deriveMeasurements(measurements);
				return {
					...measurements,
					...componentMeasurements,
				};
			}, providedMeasurements);
			this._measurements = derivedMeasurements;
		}
		return this._measurements;
	}

	offsets() {
		if (!this._offsets) {
			const measurements = this.measurements();
			const derivedOffsets = this.components.reduce((offsets, Component) => {
				if (!Component.deriveOffsets) {
					return offsets;
				}
				const componentOffsets = Component.deriveOffsets({
					measurements,
					offsets,
				});
				return {
					...offsets,
					...componentOffsets,
				};
			}, EMPTY_OBJECT);
			this._offsets = derivedOffsets;
		}
		return this._offsets;
	}

	coordinates() {
		if (!this._coordinates) {
			const measurements = this.measurements();
			const offsets = this.offsets();
			const derivedCoordinates = this.components.reduce((coordinates, Component) => {
				if (!Component.deriveCoordinates) {
					return coordinates;
				}
				const componentCoordinates = Component.deriveCoordinates({
					coordinates,
					measurements,
					offsets,
				});
				return {
					...coordinates,
					...componentCoordinates,
				};
			}, EMPTY_OBJECT);
			this._coordinates = derivedCoordinates;
		}
		return this._coordinates;
	}

	size() {
		if (!this._size) {
			const coordinates = this.coordinates();
			const size = calculateSize(coordinates);
			this._size = size;
		}
		return this._size;
	}

	shift({ x = 0, y = 0 }) {
		this._coordinates = shiftCoordinates({
			shift: { x, y },
			coordinates: this.coordinates(),
		});
	}

	draw() {
		if (!this._garmentStrokes) {
			const coordinates = this.coordinates();
			const measurements = this.measurements();
			const offsets = this.offsets();
			const derivedGarmentStrokes = this.components.reduce((garmentStrokes, Component) => {
				const componentGarmentStrokes = Component.drawGarment({
					coordinates,
					measurements,
					offsets,
				});
				return [
					...garmentStrokes,
					...componentGarmentStrokes,
				];
			}, EMPTY_ARRAY);
			this._garmentStrokes = derivedGarmentStrokes;
		}
		return this._garmentStrokes;
	}

	drawMeasurements() {
		const coordinates = this.coordinates();
		const measurements = this.measurements();
		return drawMeasurements(
			measurements,
			this.measurementMap(coordinates),
		);
	}
}
