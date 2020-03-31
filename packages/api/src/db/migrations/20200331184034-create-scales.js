import { DataTypes, Sequelize } from 'sequelize';

const TABLE_NAME = 'shapes';

function up(queryInterface) {
  return queryInterface.createTable(TABLE_NAME, {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isLowercase: true,
        isAlphanumeric: true,
      },
    },
    line: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'lines',
        key: 'id',
      },
    },
    privateKey: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  });
}

function down(queryInterface) {
  return queryInterface.dropTable(TABLE_NAME);
}

export default { down, up };
