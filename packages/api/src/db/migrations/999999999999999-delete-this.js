import { Brand, Garment } from '@models';

async function up() {
	const tshirt = await new Garment({
		name: `T Shirt`,
		slug: `tshirt`,
	}).save();

	const hipWidth = await tshirt.createSegment({
		name: 'Hip width',
		propName: 'hipWidth',
	});
	const chestWidth = await tshirt.createSegment({
		name: 'Chest width',
		propName: 'chestWidth',
	});

	/**
	 * Adidas
	 */

	const adidas = await new Brand({
		name: `Adidas`,
		slug: `adidas`,
	}).save();

		/**
		 * Adidas men
		 */

		const adidasMen = await adidas.createCollection({
			name: 'Men',
		});
		await adidasMen.addGarment(tshirt.id);

			/**
			 * Adidas men slim
			 */

			const adidasMenSlim = await adidasMen.createFit({
				name: 'Slim',
				garmentId: tshirt.id,
			});

				/**
				 * Adidas men slim small
				 */

				const adidasMenSlimSmall = await adidasMenSlim.createSize({
					name: 'Small',
				});

					await adidasMenSlimSmall.createMeasurement({
						average: 26,
						segmentId: hipWidth.id,
					});

					await adidasMenSlimSmall.createMeasurement({
						average: 29,
						segmentId: chestWidth.id,
					});

				/**
				 * Adidas men slim medium
				 */

				const adidasMenSlimMedium = await adidasMenSlim.createSize({
					name: 'Medium',
				});

				await adidasMenSlimMedium.createMeasurement({
					average: 28,
					segmentId: hipWidth.id,
				});

				await adidasMenSlimMedium.createMeasurement({
					average: 31,
					segmentId: chestWidth.id,
				});

				/**
				 * Adidas men slim large
				 */

				const adidasMenSlimLarge = await adidasMenSlim.createSize({
					name: 'Large',
				});

				await adidasMenSlimLarge.createMeasurement({
					average: 30,
					segmentId: hipWidth.id,
				});

				await adidasMenSlimLarge.createMeasurement({
					average: 34,
					segmentId: chestWidth.id,
				});


			/**
			 * Adidas men regular
			 */

			const adidasMenRegular = await adidasMen.createFit({
				name: 'Regular',
				garmentId: tshirt.id,
			});

				/**
				 * Adidas men regular small
				 */

				const adidasMenRegularSmall = await adidasMenRegular.createSize({
					name: 'Small',
				});

				await adidasMenRegularSmall.createMeasurement({
					average: 28,
					segmentId: hipWidth.id,
				});

				await adidasMenRegularSmall.createMeasurement({
					average: 28,
					segmentId: chestWidth.id,
				});

				/**
				 * Adidas men regular medium
				 */

				const adidasMenRegularMedium = await adidasMenRegular.createSize({
					name: 'Medium',
				});

				await adidasMenRegularMedium.createMeasurement({
					average: 31,
					segmentId: hipWidth.id,
				});

				await adidasMenRegularMedium.createMeasurement({
					average: 31,
					segmentId: chestWidth.id,
				});

				/**
				 * Adidas men regular large
				 */

				const adidasMenRegularLarge = await adidasMenRegular.createSize({
					name: 'Large',
				});

				await adidasMenRegularLarge.createMeasurement({
					average: 34,
					segmentId: hipWidth.id,
				});

				await adidasMenRegularLarge.createMeasurement({
					average: 34,
					segmentId: chestWidth.id,
				});



		/**
		 * Adidas women
		 */

		const adidasWomen = await adidas.createCollection({
			name: 'Women',
		});
		await adidasWomen.addGarment(tshirt.id);

	/**
	 * Adidas women slim
	 */

	const adidasWomenSlim = await adidasWomen.createFit({
		name: 'Petite',
		garmentId: tshirt.id,
	});

	/**
	 * Adidas women slim small
	 */

	const adidasWomenSlimSmall = await adidasWomenSlim.createSize({
		name: 'Small',
	});

	await adidasWomenSlimSmall.createMeasurement({
		average: 20,
		segmentId: hipWidth.id,
	});

	await adidasWomenSlimSmall.createMeasurement({
		average: 22,
		segmentId: chestWidth.id,
	});

	/**
	 * Adidas women slim medium
	 */

	const adidasWomenSlimMedium = await adidasWomenSlim.createSize({
		name: 'Medium',
	});

	await adidasWomenSlimMedium.createMeasurement({
		average: 22,
		segmentId: hipWidth.id,
	});

	await adidasWomenSlimMedium.createMeasurement({
		average: 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Adidas women slim large
	 */

	const adidasWomenSlimLarge = await adidasWomenSlim.createSize({
		name: 'Large',
	});

	await adidasWomenSlimLarge.createMeasurement({
		average: 24,
		segmentId: hipWidth.id,
	});

	await adidasWomenSlimLarge.createMeasurement({
		average: 26,
		segmentId: chestWidth.id,
	});


	/**
	 * Adidas women regular
	 */

	const adidasWomenRegular = await adidasWomen.createFit({
		name: 'Regular',
		garmentId: tshirt.id,
	});

	/**
	 * Adidas women regular small
	 */

	const adidasWomenRegularSmall = await adidasWomenRegular.createSize({
		name: 'Small',
	});

	await adidasWomenRegularSmall.createMeasurement({
		average: 24,
		segmentId: hipWidth.id,
	});

	await adidasWomenRegularSmall.createMeasurement({
		average: 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Adidas women regular medium
	 */

	const adidasWomenRegularMedium = await adidasWomenRegular.createSize({
		name: 'Medium',
	});

	await adidasWomenRegularMedium.createMeasurement({
		average: 26,
		segmentId: hipWidth.id,
	});

	await adidasWomenRegularMedium.createMeasurement({
		average: 26,
		segmentId: chestWidth.id,
	});

	/**
	 * Adidas women regular large
	 */

	const adidasWomenRegularLarge = await adidasWomenRegular.createSize({
		name: 'Large',
	});

	await adidasWomenRegularLarge.createMeasurement({
		average: 28,
		segmentId: hipWidth.id,
	});

	await adidasWomenRegularLarge.createMeasurement({
		average: 28,
		segmentId: chestWidth.id,
	});
}

export default { up, down: () => ({}) };
