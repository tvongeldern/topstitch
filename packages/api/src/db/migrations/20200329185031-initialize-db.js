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
  return Object.entries(foreignKeys).reduce((columns, [key, table]) => ({
    ...columns,
    [key]: foreignKey(table),
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

const email = {
  type: DataTypes.STRING,
  validate: {
    isEmail: true,
  },
};

const uuid = {
  type: DataTypes.UUID,
  unique: true,
};

const id = {
  ...uuid,
  primaryKey: true,
  allowNull: false,
  defaultValue: Sequelize.literal('uuid_generate_v4()'),
};

const name = {
  type: DataTypes.STRING,
  allowNull: false,
};

const paragraph = {
  type: DataTypes.STRING,
};

const propName = {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    is: PROP_NAME,
    len: [2, 64],
  },
};

const slug = {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
    is: SLUG,
    len: [2, 32],
  },
};

const website = {
  type: DataTypes.STRING,
  validate: {
    isUrl: {
      msg: 'Invalid URL',
      require_protocol: false,
    },
  },
};

const TABLES = {
  accounts: {
    columns: {
      cognitoId: {
        ...uuid,
        allowNull: false,
      },
      email: {
        ...email,
        allowNull: false,
        unique: true,
      },
    },
  },
  brands: {
    columns: {
      name: { ...name, unique: true },
      slug,
      website,
    },
  },
  collections: {
    foreignKeys: {
      brandId: 'brands',
    },
    columns: { name },
    uniqueIndexes: [
      ['brandId', 'name'],
    ],
  },
  collectionGarments: {
    foreignKeys: {
      collectionId: 'collections',
      garmentId: 'garments',
    },
    uniqueIndexes: [
      ['garmentId', 'collectionId'],
    ],
  },
  fits: {
    foreignKeys: {
      collectionId: 'collections',
      garmentId: 'garments',
    },
    columns: { name },
    uniqueIndexes: [
      ['collectionId', 'name'],
    ],
  },
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
  measurements: {
    foreignKeys: {
      sizeId: 'sizes',
      segmentId: 'segments',
    },
    columns: {
      average: {
        ...measurementNumber,
        allowNull: false,
      },
    },
    uniqueIndexes: [
      ['segmentId', 'sizeId'],
    ],
  },
  segments: {
    foreignKeys: {
      garmentId: 'garments',
    },
    columns: { name, propName, description: paragraph },
    uniqueIndexes: [
      ['garmentId', 'name'],
      ['garmentId', 'propName'],
    ],
  },
  sizes: {
    foreignKeys: {
      fitId: 'fits',
    },
    columns: { name },
    uniqueIndexes: [
      ['fitId', 'name'],
    ]
  },
  sizeSegments: {
    foreignKeys: {
      sizeId: 'sizes',
      segmentId: 'segments',
    },
    uniqueIndexes: [
      ['segmentId', 'sizeId'],
    ],
  },
  savedSizes: {
    columns: {
      name,
    },
    foreignKeys: {
      sizeId: 'sizes',
      accountId: 'accounts',
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
    ...Object.entries(foreignKeys).reduce((fk, [key, reference]) => [
      ...fk,
      {
        table,
        key,
        reference,
      },
    ], [])
  ], []);

const tableUniqueIndexes = TABLE_ENTRIES
  .filter(([name, { uniqueIndexes }]) => uniqueIndexes)
  .reduce((indexes, [name, { uniqueIndexes }]) => [
    ...indexes,
    ...uniqueIndexes.map((index) => ({
      table: name,
      keys: index,
    })),
  ], []);

async function up(queryInterface) {
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await Promise.all(
    tables.map((table) => queryInterface.createTable(...table)),
  );
  await Promise.all(
    tableForeignKeys.map(
      ({ table, key, reference }) => queryInterface.addConstraint(
        table,
        [key],
        {
          references: {
            table: reference,
            field: 'id',
          },
          onDelete: 'cascade',
          type: 'foreign key',
        },
      ),
    ),
  );
  await Promise.all(
    tableUniqueIndexes.map(({ table, keys }) => queryInterface.addIndex(
      table,
      keys,
      { unique: true },
    )),
  );
}

function down(queryInterface) {
  return queryInterface.dropTable(TABLE_NAME);
}

export default { down, up };
