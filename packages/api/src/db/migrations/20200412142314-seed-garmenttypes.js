import { logger } from '../migration-logger';

const garments = [
  {
    name: 'Shirt',
    slug: 'shirt',
    segments: [
      {
        name: 'Hip Width',
        propName: 'hipWidth',
        description: 'Hip width is measured from the left hip to the right hip.',
      },
      {
        name: 'Waist Width',
        propName: 'waistWidth',
        description: 'Waist width is measured from the left waist to the right waist. The waist is located vertically at the halfway point between the hips and the armpits.',
      },
      {
        name: 'Chest Width',
        propName: 'chestWidth',
        description: 'Chest width is measured from the left armpit to the right armpit.',
      },
      {
        name: 'Shoulder Width',
        propName: 'shoulderWidth',
        description: 'Shoulder width is measured from the left shoulder to the right shoulder.',
      },
      {
        name: 'Neck Width',
        propName: 'neckWidth',
        description: 'Neck width is measured horizontally from the left edge of the colar to the right edge of the collar.',
      },
      {
        name: 'Hip to Armpit Height',
        propName: 'hipToArmpitHeight',
        description: 'Hip to armpit height is measured vertically from the left hip to the left armpit.',
      },
      {
        name: 'Hip to Neck Height - Front',
        propName: 'hipToNeckHeightFront',
        description: 'Front hip neck height is measured vertically from the front of the collar to the middle point of the line between the hips.',
      },
      {
        name: 'Hip to Neck Height - Back',
        propName: 'hipToNeckHeightBack',
        description: 'Back hip neck height is measured vertically from the back of the collar to the middle point of the line between the hips.',
      },
      {
        name: 'Hip to Neck Height - Side',
        propName: 'hipToNeckHeightSide',
        description: 'Side hip neck height is measured from the left side of the collar, vertically down to the line between the hips.',
      },
      {
        name: 'Sleeve Length - Outer',
        propName: 'sleeveLengthOuter',
        description: 'Outer sleeve length is measured from the left shoulder to the outer/upper end of the left sleeve.',
      },
      {
        name: 'Sleeve Width - Elbow',
        propName: 'sleeveWidthElbow',
        description: 'Elbow sleeve width is measured across the elbow of the sleeve, exactly halfway between the wrist and the shoulder.',
      },
      {
        name: 'Sleeve Width - Shoulder',
        propName: 'sleeveWidthShoulder',
        description: 'Sleeve width is measured across the end of the sleeve.',
      },
      {
        name: 'Neck to Shoulder Length',
        propName: 'neckToShoulderLength',
        description: 'Neck to shoulder length is measured from the shoulder to the edge of the neck/collar.',
      },
    ],
  },
];

function addTimestamps(object) {
  const timestamp = new Date();
  return {
    ...object,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function GarmentGenerator({ queryInterface }) {
  return async function generateGarment({ segments, ...garment }) {
    await queryInterface.bulkInsert(
      'garments',
      [
        addTimestamps(garment),
      ],
    );
    const garmentId = await queryInterface.rawSelect('garments', { where: garment }, ['id']);
    await queryInterface.bulkInsert(
      'segments',
      segments.map((segment) => ({
        garmentId,
        ...addTimestamps(segment),
      })),
    );
    logger.success(`Generated garment type "${garment.name}"`);
  }
}

async function up(queryInterface) {
  const generate = GarmentGenerator({ queryInterface });
  await Promise.all(
    garments.map(generate),
  );
}

async function down(queryInterface) {
  // return queryInterface.changeColumn(
  //   TABLE_NAME,
  //   {
      
  //   }
  // );
}

export default { down, up };
