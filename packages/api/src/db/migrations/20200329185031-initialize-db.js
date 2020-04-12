import { DataTypes, Sequelize } from 'sequelize';
import { SLUG } from '@constants/patterns';

function foreignKey(model) {
  return {
    type: Sequelize.UUID,
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

const DEFAULT_COLUMNS = {
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: SLUG,
    },
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
};

const TABLES = {
  accounts: {
    columns: ({ createdAt, id, updatedAt }) => ({
      createdAt,
      id,
      updatedAt,
    }),
  },
  garmentTypes: {
    columns: ({ name, slug, ...defaults }) => ({
      ...defaults,
      name: {
        ...name,
        unique: true,
      },
      slug: {
        ...slug,
        unique: true,
      }
    }),
  },
  garmentSegments: {
    foreignKeys: {
      garmentTypeId: {
        model: 'garmentTypes',
        unique: ['name', 'slug'],
      },
    },
    columns: (defaults) => ({
      ...defaults,
    }),
  },
  brands: {
    columns: ({ name, slug, ... defaults }) => ({
      ...defaults,
      name: {
        ...name,
        unique: true,
      },
      slug: {
        ...slug,
        unique: true,
      }
    }),
  },
  lines: {
    foreignKeys: {
      brandId: {
        model: 'brands',
        unique: ['name', 'slug'],
      },
    },
    columns: (defaults) => ({
      ...defaults,
      brandId: foreignKey('brands'),
    }),
  },
  collections: {
    foreignKeys: {
      lineId: {
        model: 'lines',
        unique: ['name', 'slug'],
      },
    },
    columns: (defaults) => ({
      ...defaults,
    }),
  },
  collectionGarmentTypes: {
    foreignKeys: {
      collectionId: {
        model: 'collections',
      },
      garmentTypeId: {
        model: 'garmentTypes',
      },
    },
    columns: ({ createdAt, id, updatedAt }) => ({
      createdAt,
      id,
      updatedAt,
    }),
  },
  fits: {
    foreignKeys: {
      collectionId: {
        model: 'collections',
        unique: ['name', 'slug'],
      },
      garmentTypeId: {
        model: 'garmentTypes',
      }
    },
    columns: (defaults) => ({
      ...defaults,
    }),
  },
  sizes: {
    foreignKeys: {
      fitId: {
        model: 'fits',
        unique: ['name', 'slug'],
      },
    },
    columns: (defaults) => ({
      ...defaults,
    }),
  },
  sizeGarmentSegments: {
    foreignKeys: {
      sizeId: {
        model: 'sizes',
      },
      garmentSegmentId: {
        model: 'garmentSegments',
      },
    },
    columns: ({ createdAt, id, updatedAt }) => ({
      createdAt,
      id,
      updatedAt,
    }),
  },
  measurements: {
    foreignKeys: {
      sizeId: {
        model: 'sizes',
      },
      garmentSegmentId: {
        model: 'garmentSegments',
      },
    },
    columns: ({ name, slug, ...defaults }) => ({
      ...defaults,
      average: {
        type: DataTypes.SMALLINT,
      },
      min: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      max: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    }),
  },
};

const TABLE_ENTRIES = Object.entries(TABLES);

const tables = TABLE_ENTRIES.map(([name, { columns, foreignKeys }]) => [
  name,
  {
    ...columns(DEFAULT_COLUMNS),
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
    ['garmentSegmentId', 'sizeId'],
    { unique: true },
  );
}

function down(queryInterface) {
  return queryInterface.dropTable(TABLE_NAME);
}

export default { down, up };
