import { Garment, Segment } from '@models';
import { logger } from '../migration-logger';

const garments = [
  {
    name: 'T-Shirt',
    slug: 'tshirt',
    segments: [
      {
        name: 'Sleeve length',
        slug: 'sleevelength',
      },
      {
        name: 'Hip width',
        slug: 'hipwidth',
      },
      {
        name: 'Waist width',
        slug: 'waistwidth',
      }
    ],
  }
]

async function generateGarment({ segments, ...where }) {
  const existing = await Garment.findOne({ where });
  if (existing) {
    logger.error(`Garment type ${where.name} already exists`);
    throw new Error('Tried to seed existing object');
  }
  const garment = await new Garment(where).save();
  await Promise.all(
    segments.map((segment) => garment.createSegment(segment)),
  );
  logger.success(`Generated garment type "${where.name}"`);
}

async function up(queryInterface) {
  await Promise.all(
    garments.map(generateGarment),
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
