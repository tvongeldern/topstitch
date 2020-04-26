import { Field } from 'react-final-form';
import { RadioLabel } from '@components/inputs';
import styles from './styles.scss';

export const DIVIDER = '::';

export function Sizechart({
	sizechart,
	selected,
	garments,
	segments,
}) {
	const brandsMap = sizechart.brands || {};
	const brandsArray = Object.values(brandsMap || {});
	const selectedBrand = brandsMap[selected.brand] || {};

	const collectionsMap = selectedBrand.collections || {};
	const collectionsArray = Object.values(collectionsMap);
	const selectedCollection = collectionsMap[selected.collection] || {};

	const garmentsMap = selectedCollection.garments || {};
	const garmentsArray = Object.values(garmentsMap);
	const selectedGarment = garmentsMap[selected.garment] || {};
	
	const fitsMap = selectedGarment.fits || {};
	const fitsArray = Object.values(fitsMap);
	const selectedFit = fitsMap[selected.fit] || {};

	const sizesMap = selectedFit.sizes || {};
	const sizesArray = Object.values(sizesMap);
	const selectedSize = sizesMap[selected.size] || {};

	const measurementsMap = selectedSize.measurements || {};
	const measurementsArray = Object.values(measurementsMap);
	const selectedMeasurement = measurementsMap[selected.measurement] || {};

	return (
		<div className={styles.sizechart}>
			{brandsArray.length > 0 && (
				<div className={styles.type}>
					<h3>Brand</h3>
					<div className={styles.list}>
						{brandsArray.map(
							(brand) => (
								<Field
									name="selected"
									type="radio"
									value={brand['name']}
									label={brand['name']}
									component={RadioLabel}
									key={brand['name']}
								/>
							)
						)}
					</div>
				</div>
			)}

			{collectionsArray.length > 0 && (
				<div className={styles.type}>
					<h3>Collections</h3>
					<div className={styles.list}>
						{collectionsArray.map(
							(collection) => (
								<Field
									name="selected"
									type="radio"
									value={[selected.brand, collection['name']].join(DIVIDER)}
									label={collection['name']}
									component={RadioLabel}
									key={collection['name']}
								/>
							)
						)}
					</div>
				</div>
			)}

			{garmentsArray.length > 0 && (
				<div className={styles.type}>
					<h3>Garments</h3>
					<div className={styles.list}>
						{garmentsArray.map(
							(garment) => (
								<Field
									name="selected"
									type="radio"
									value={[selected.brand, selected.collection, garment['id']].join(DIVIDER)}
									label={garments[garment['id']].name}
									component={RadioLabel}
									key={garment['id']}
								/>
							)
						)}
					</div>
				</div>
			)}

			{fitsArray.length > 0 && (
				<div className={styles.type}>
					<h3>Fits</h3>
					<div className={styles.list}>
						{fitsArray.map(
							(fit) => (
								<Field
									name="selected"
									type="radio"
									value={[
										selected.brand,
										selected.collection,
										selected.garment,
										fit['name']
									].join(DIVIDER)}
									label={fit['name']}
									component={RadioLabel}
									key={fit['name']}
								/>
							)
						)}
					</div>
				</div>
			)}

			{sizesArray.length > 0 && (
				<div className={styles.type}>
					<h3>Sizes</h3>
					<div className={styles.list}>
						{sizesArray.map(
							(size) => (
								<Field
									name="selected"
									type="radio"
									value={[
										selected.brand,
										selected.collection,
										selected.garment,
										selected.fit,
										size['name'],
									].join(DIVIDER)}
									label={size['name']}
									component={RadioLabel}
									key={size['name']}
								/>
							)
						)}
					</div>
				</div>
			)}

			{measurementsArray.length > 0 && (
				<div className={styles.type}>
					<h3>Measurements</h3>
					<div className={styles.list}>
						{measurementsArray.map(
							(measurement) => (
								<Field
									name="selected"
									type="radio"
									value={[
										selected.brand,
										selected.collection,
										selected.garment,
										selected.fit,
										selected.size,
										measurement['segmentId'],
									].join(DIVIDER)}
									label={`${segments[measurement['segmentId']].name} : ${measurement['mm']}`}
									component={RadioLabel}
									key={measurement['segmentId']}
								/>
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
}
