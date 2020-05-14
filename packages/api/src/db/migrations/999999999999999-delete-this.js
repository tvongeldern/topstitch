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
						average: 26 * 24,
						segmentId: hipWidth.id,
					});

					await adidasMenSlimSmall.createMeasurement({
						average: 29 * 24,
						segmentId: chestWidth.id,
					});

				/**
				 * Adidas men slim medium
				 */

				const adidasMenSlimMedium = await adidasMenSlim.createSize({
					name: 'Medium',
				});

				await adidasMenSlimMedium.createMeasurement({
					average: 28 * 24,
					segmentId: hipWidth.id,
				});

				await adidasMenSlimMedium.createMeasurement({
					average: 31 * 24,
					segmentId: chestWidth.id,
				});

				/**
				 * Adidas men slim large
				 */

				const adidasMenSlimLarge = await adidasMenSlim.createSize({
					name: 'Large',
				});

				await adidasMenSlimLarge.createMeasurement({
					average: 30 * 24,
					segmentId: hipWidth.id,
				});

				await adidasMenSlimLarge.createMeasurement({
					average: 34 * 24,
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
					average: 28 * 24,
					segmentId: hipWidth.id,
				});

				await adidasMenRegularSmall.createMeasurement({
					average: 28 * 24,
					segmentId: chestWidth.id,
				});

				/**
				 * Adidas men regular medium
				 */

				const adidasMenRegularMedium = await adidasMenRegular.createSize({
					name: 'Medium',
				});

				await adidasMenRegularMedium.createMeasurement({
					average: 31 * 24,
					segmentId: hipWidth.id,
				});

				await adidasMenRegularMedium.createMeasurement({
					average: 31 * 24,
					segmentId: chestWidth.id,
				});

				/**
				 * Adidas men regular large
				 */

				const adidasMenRegularLarge = await adidasMenRegular.createSize({
					name: 'Large',
				});

				await adidasMenRegularLarge.createMeasurement({
					average: 34 * 24,
					segmentId: hipWidth.id,
				});

				await adidasMenRegularLarge.createMeasurement({
					average: 34 * 24,
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
		average: 20 * 24,
		segmentId: hipWidth.id,
	});

	await adidasWomenSlimSmall.createMeasurement({
		average: 22 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Adidas women slim medium
	 */

	const adidasWomenSlimMedium = await adidasWomenSlim.createSize({
		name: 'Medium',
	});

	await adidasWomenSlimMedium.createMeasurement({
		average: 22 * 24,
		segmentId: hipWidth.id,
	});

	await adidasWomenSlimMedium.createMeasurement({
		average: 24 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Adidas women slim large
	 */

	const adidasWomenSlimLarge = await adidasWomenSlim.createSize({
		name: 'Large',
	});

	await adidasWomenSlimLarge.createMeasurement({
		average: 24 * 24,
		segmentId: hipWidth.id,
	});

	await adidasWomenSlimLarge.createMeasurement({
		average: 26 * 24,
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
		average: 24 * 24,
		segmentId: hipWidth.id,
	});

	await adidasWomenRegularSmall.createMeasurement({
		average: 24 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Adidas women regular medium
	 */

	const adidasWomenRegularMedium = await adidasWomenRegular.createSize({
		name: 'Medium',
	});

	await adidasWomenRegularMedium.createMeasurement({
		average: 26 * 24,
		segmentId: hipWidth.id,
	});

	await adidasWomenRegularMedium.createMeasurement({
		average: 26 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Adidas women regular large
	 */

	const adidasWomenRegularLarge = await adidasWomenRegular.createSize({
		name: 'Large',
	});

	await adidasWomenRegularLarge.createMeasurement({
		average: 28 * 24,
		segmentId: hipWidth.id,
	});

	await adidasWomenRegularLarge.createMeasurement({
		average: 28 * 24,
		segmentId: chestWidth.id,
	});









	/**
	 * Nike
	 */

	const nike = await new Brand({
		name: `Nike`,
		slug: `nike`,
	}).save();

	/**
	 * Nike men
	 */

	const nikeMen = await nike.createCollection({
		name: 'Men',
	});
	await nikeMen.addGarment(tshirt.id);

	/**
	 * Nike men slim
	 */

	const nikeMenSlim = await nikeMen.createFit({
		name: 'Slim',
		garmentId: tshirt.id,
	});

	/**
	 * Nike men slim small
	 */

	const nikeMenSlimSmall = await nikeMenSlim.createSize({
		name: 'Small',
	});

	await nikeMenSlimSmall.createMeasurement({
		average: 26 * 24,
		segmentId: hipWidth.id,
	});

	await nikeMenSlimSmall.createMeasurement({
		average: 29 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Nike men slim medium
	 */

	const nikeMenSlimMedium = await nikeMenSlim.createSize({
		name: 'Medium',
	});

	await nikeMenSlimMedium.createMeasurement({
		average: 28 * 24,
		segmentId: hipWidth.id,
	});

	await nikeMenSlimMedium.createMeasurement({
		average: 31 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Nike men slim large
	 */

	const nikeMenSlimLarge = await nikeMenSlim.createSize({
		name: 'Large',
	});

	await nikeMenSlimLarge.createMeasurement({
		average: 30 * 24,
		segmentId: hipWidth.id,
	});

	await nikeMenSlimLarge.createMeasurement({
		average: 34 * 24,
		segmentId: chestWidth.id,
	});


	/**
	 * Nike men regular
	 */

	const nikeMenRegular = await nikeMen.createFit({
		name: 'Regular',
		garmentId: tshirt.id,
	});

	/**
	 * Nike men regular small
	 */

	const nikeMenRegularSmall = await nikeMenRegular.createSize({
		name: 'Small',
	});

	await nikeMenRegularSmall.createMeasurement({
		average: 28 * 24,
		segmentId: hipWidth.id,
	});

	await nikeMenRegularSmall.createMeasurement({
		average: 28 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Nike men regular medium
	 */

	const nikeMenRegularMedium = await nikeMenRegular.createSize({
		name: 'Medium',
	});

	await nikeMenRegularMedium.createMeasurement({
		average: 31 * 24,
		segmentId: hipWidth.id,
	});

	await nikeMenRegularMedium.createMeasurement({
		average: 31 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Nike men regular large
	 */

	const nikeMenRegularLarge = await nikeMenRegular.createSize({
		name: 'Large',
	});

	await nikeMenRegularLarge.createMeasurement({
		average: 34 * 24,
		segmentId: hipWidth.id,
	});

	await nikeMenRegularLarge.createMeasurement({
		average: 34 * 24,
		segmentId: chestWidth.id,
	});



	/**
	 * Nike women
	 */

	const nikeWomen = await nike.createCollection({
		name: 'Women',
	});
	await nikeWomen.addGarment(tshirt.id);

	/**
	 * Nike women slim
	 */

	const nikeWomenSlim = await nikeWomen.createFit({
		name: 'Petite',
		garmentId: tshirt.id,
	});

	/**
	 * Nike women slim small
	 */

	const nikeWomenSlimSmall = await nikeWomenSlim.createSize({
		name: 'Small',
	});

	await nikeWomenSlimSmall.createMeasurement({
		average: 20 * 24,
		segmentId: hipWidth.id,
	});

	await nikeWomenSlimSmall.createMeasurement({
		average: 22 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Nike women slim medium
	 */

	const nikeWomenSlimMedium = await nikeWomenSlim.createSize({
		name: 'Medium',
	});

	await nikeWomenSlimMedium.createMeasurement({
		average: 22 * 24,
		segmentId: hipWidth.id,
	});

	await nikeWomenSlimMedium.createMeasurement({
		average: 24 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Nike women slim large
	 */

	const nikeWomenSlimLarge = await nikeWomenSlim.createSize({
		name: 'Large',
	});

	await nikeWomenSlimLarge.createMeasurement({
		average: 24 * 24,
		segmentId: hipWidth.id,
	});

	await nikeWomenSlimLarge.createMeasurement({
		average: 26 * 24,
		segmentId: chestWidth.id,
	});


	/**
	 * Nike women regular
	 */

	const nikeWomenRegular = await nikeWomen.createFit({
		name: 'Regular',
		garmentId: tshirt.id,
	});

	/**
	 * Nike women regular small
	 */

	const nikeWomenRegularSmall = await nikeWomenRegular.createSize({
		name: 'Small',
	});

	await nikeWomenRegularSmall.createMeasurement({
		average: 24 * 24,
		segmentId: hipWidth.id,
	});

	await nikeWomenRegularSmall.createMeasurement({
		average: 24 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Nike women regular medium
	 */

	const nikeWomenRegularMedium = await nikeWomenRegular.createSize({
		name: 'Medium',
	});

	await nikeWomenRegularMedium.createMeasurement({
		average: 26 * 24,
		segmentId: hipWidth.id,
	});

	await nikeWomenRegularMedium.createMeasurement({
		average: 26 * 24,
		segmentId: chestWidth.id,
	});

	/**
	 * Nike women regular large
	 */

	const nikeWomenRegularLarge = await nikeWomenRegular.createSize({
		name: 'Large',
	});

	await nikeWomenRegularLarge.createMeasurement({
		average: 28 * 24,
		segmentId: hipWidth.id,
	});

	await nikeWomenRegularLarge.createMeasurement({
		average: 28 * 24,
		segmentId: chestWidth.id,
	});

}

export default { up, down: () => ({}) };
