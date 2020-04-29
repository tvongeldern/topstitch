import { EMPTY_OBJECT } from '@constants';

export function reduceMeasurementsToObject(measurementsArray) {
	return measurementsArray.reduce((measurementsObject, { average, segment }) => ({
		...measurementsObject,
		[segment.propName]: average,
	}), EMPTY_OBJECT);
}
