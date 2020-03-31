import { DataTypes } from 'sequelize';

const TABLE_NAME = 'brands';

function up(queryInterface) {
  return queryInterface.changeColumn(
    TABLE_NAME,
    'slug',
    {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isLowercase: true,
        isAlphanumeric: true,
      },
    },
  );
}

function down(queryInterface) {
  return queryInterface.changeColumn(
    TABLE_NAME,
    'slug',
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isLowercase: true,
        isAlphanumeric: true,
      },
    },
  );
}

export default { down, up };
