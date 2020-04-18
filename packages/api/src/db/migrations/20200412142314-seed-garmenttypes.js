import { logger } from '../migration-logger';

const garments = [
  {
    name: 'Shirt',
    slug: 'shirt',
    segments: [
      {
        name: 'Hip Width',
        propName: 'hipWidth',
      },
      {
        name: 'Waist Width',
        propName: 'waistWidth',
      },
      {
        name: 'Chest Width',
        propName: 'chestWidth',
      },
      {
        name: 'Shoulder Width',
        propName: 'shoulderWidth',
      },
      {
        name: 'Neck Width',
        propName: 'neckWidth',
      },
      {
        name: 'Hip to Armpit Height',
        propName: 'hipToArmpitHeight',
      },
      {
        name: 'Hip to Neck Height - Front',
        propName: 'hipToNeckHeightFront',
      },
      {
        name: 'Hip to Neck Height - Back',
        propName: 'hipToNeckHeightBack',
      },
      {
        name: 'Hip to Neck Height - Side',
        propName: 'hipToNeckHeightSide',
      },
      {
        name: 'Sleeve Length - Outer',
        propName: 'sleeveLengthOuter',
      },
      {
        name: 'Sleeve Width - Elbow',
        propName: 'sleeveWidthElbow',
      },
      {
        name: 'Sleeve Width - Shoulder',
        propName: 'sleeveWidthShoulder',
      },
      {
        name: 'Neck to Shoulder Length',
        propName: 'neckToShoulderLength',
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
