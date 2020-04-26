import { Field } from 'react-final-form';
import { RadioLabel } from '@components/inputs';
import styles from './styles.scss';

export const DIVIDER = '::';

function RadioGroup({
	map,
	inputKey = 'name',
	title,
	getRadioValue,
	getRadioLabel = (obj) => obj[inputKey],
}) {
	const array = Object.values(map || {});
	if (array.length === 0) { return null; }
	return (
		<div className={styles.type}>
			<h3>{title}</h3>
			<div className={styles.list}>
				{array.map(
					(obj) => (
						<Field
							name="selected"
							type="radio"
							value={getRadioValue(obj)}
							label={getRadioLabel(obj)}
							component={RadioLabel}
							key={obj[inputKey]}
						/>
					)
				)}
			</div>
		</div>
	)
}

export function Sizechart({
	sizechart,
	selected,
	garments,
	segments,
}) {
	const brandsMap = sizechart.brands || {};
	const selectedBrand = brandsMap[selected.brand] || {};

	const collectionsMap = selectedBrand.collections || {};
	const selectedCollection = collectionsMap[selected.collection] || {};

	const garmentsMap = selectedCollection.garments || {};
	const selectedGarment = garmentsMap[selected.garment] || {};
	
	const fitsMap = selectedGarment.fits || {};
	const selectedFit = fitsMap[selected.fit] || {};

	const sizesMap = selectedFit.sizes || {};
	const selectedSize = sizesMap[selected.size] || {};

	const measurementsMap = selectedSize.measurements || {};
	const selectedMeasurement = measurementsMap[selected.measurement] || {};

	return (
		<div className={styles.sizechart}>
			<RadioGroup
				map={brandsMap}
				title="Brand"
				getRadioValue={({ name }) => name}
			/>

			<RadioGroup
				map={collectionsMap}
				title="Collections"
				getRadioValue={({ name }) => [selected.brand, name].join(DIVIDER)}
			/>

			<RadioGroup
				map={garmentsMap}
				title="Garments"
				inputKey="id"
				getRadioValue={({ id }) => [selected.brand, selected.collection, id].join(DIVIDER)}
				getRadioLabel={({ id }) => garments[id].name}
			/>

			<RadioGroup
				map={fitsMap}
				title="Fits"
				getRadioValue={({ name }) => [
					selected.brand,
					selected.collection,
					selected.garment,
					name,
				].join(DIVIDER)}
			/>

			<RadioGroup
				map={sizesMap}
				title="Sizes"
				getRadioValue={({ name }) => [
					selected.brand,
					selected.collection,
					selected.garment,
					selected.fit,
					name,
				].join(DIVIDER)}
			/>

			<RadioGroup
				map={measurementsMap}
				title="Measurements"
				inputKey="segmentId"
				getRadioValue={({ segmentId }) => [
					selected.brand,
					selected.collection,
					selected.garment,
					selected.fit,
					selected.size,
					segmentId,
				].join(DIVIDER)}
				getRadioLabel={({ segmentId, mm }) => {
					try {
						return `${segments[segmentId].name} : ${mm}`
					} catch(e) {
						console.log(e);
						console.log({
							segments,
							segmentId,
							mm,
						});
					}
				}}
			/>
		</div>
	);
}
