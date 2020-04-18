import { DataTypes, Sequelize } from 'sequelize';
import { PROP_NAME,SLUG } from '@constants/patterns';

function foreignKey(model) {
  return {
    type: Sequelize.UUID,
    allowNull: false,
    reference: {
      model,
      key: 'id',
    },
  };
}

function addForeignKeyColumns(foreignKeys = {}) {
  return Object.entries(foreignKeys).reduce((columns, [key, { model }]) => ({
    ...columns,
    [key]: foreignKey(model),
  }), {});
}

// COLUMN DEFINITIONS

const constrainedNumber = ({
  min,
  max,
  minMsg = 'Does not meet minimum value',
  maxMsg = 'Exceeds maximum value',
}) => ({
  type: DataTypes.SMALLINT,
  validate: {
    min: {
      args: [min],
      msg: minMsg,
    },
    max: {
      args: [max],
      msg: maxMsg,
    }
  },
});

const createdAt = {
  allowNull: false,
  type: DataTypes.DATE,
};

const updatedAt = {
  allowNull: false,
  type: DataTypes.DATE,
};

const measurementNumber = constrainedNumber({
  min: 1,
  max: 9999,
  minMsg: 'All measurements must be at least 1mm',
  maxMsg: 'No measurement can be over 3 meters long',
});

export const id = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
  unique: true,
  // defaultValue: Sequelize.UUIDV4,
  defaultValue: Sequelize.literal('uuid_generate_v4()'),
};

export const name = {
  type: DataTypes.STRING,
  allowNull: false,
};

export const propName = {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    is: PROP_NAME,
    len: [2, 64],
  },
};

export const slug = {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
    is: SLUG,
    len: [2, 32],
  },
};

export const tag = {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    is: SLUG,
    len: [2, 32],
  },
};

const TABLES = {
  accounts: {},
  garments: {
    columns: {
      name: {
        ...name,
        unique: true,
      },
      slug: {
        ...slug,
        unique: true,
      },
    },
  },
  segments: {
    foreignKeys: {
      garmentId: {
        model: 'garments',
        unique: ['name', 'propName'],
      },
    },
    columns: { name, propName },
  },
  brands: {
    columns: {
      name: { ...name, unique: true },
      slug,
    },
  },
  collections: {
    foreignKeys: {
      brandId: {
        model: 'brands',
        unique: ['name', 'tag'],
      },
    },
    columns: { name, tag },
  },
  collectionGarments: {
    foreignKeys: {
      collectionId: {
        model: 'collections',
      },
      garmentId: {
        model: 'garments',
      },
    },
  },
  fits: {
    foreignKeys: {
      collectionId: {
        model: 'collections',
        unique: ['name', 'tag'],
      },
      garmentId: {
        model: 'garments',
      }
    },
    columns: { name, tag },
  },
  sizes: {
    foreignKeys: {
      fitId: {
        model: 'fits',
        unique: ['name', 'tag'],
      },
    },
    columns: { name, tag },
  },
  sizeSegments: {
    foreignKeys: {
      sizeId: {
        model: 'sizes',
      },
      segmentId: {
        model: 'segments',
      },
    },
  },
  measurements: {
    foreignKeys: {
      sizeId: {
        model: 'sizes',
      },
      segmentId: {
        model: 'segments',
      },
    },
    columns: {
      average: measurementNumber,
      min: {
        ...measurementNumber,
        allowNull: false,
      },
      max: {
        ...measurementNumber,
        allowNull: false,
      },
    },
  },
};

const TABLE_ENTRIES = Object.entries(TABLES);

const tables = TABLE_ENTRIES.map(([name, { columns = {}, foreignKeys }]) => [
  name,
  {
    id, createdAt, updatedAt,
    ...columns,
    ...addForeignKeyColumns(foreignKeys),
  },
]);

const tableForeignKeys = TABLE_ENTRIES
  .filter(([name, { foreignKeys }]) => foreignKeys)
  .reduce((tfk, [table, { foreignKeys }]) => [
    ...tfk,
    ...Object.entries(foreignKeys).reduce((fk, [key, { unique = [] }]) => [
      ...fk,
      ...unique.reduce((k, uniqueKey) => [
        ...k,
        { table, key, uniqueKey },
      ], []),
    ], [])
  ], []);

async function up(queryInterface) {
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await Promise.all(
    tables.map((table) => queryInterface.createTable(...table)),
  );
  await Promise.all(
    tableForeignKeys.map(
      ({ table, key, uniqueKey }) => queryInterface.addIndex(
        table,
        [key, uniqueKey],
        { unique: true },
      ),
    ),
  );
  await queryInterface.addIndex(
    'measurements',
    ['segmentId', 'sizeId'],
    { unique: true },
  );
}

function down(queryInterface) {
  return queryInterface.dropTable(TABLE_NAME);
}

export default { down, up };
