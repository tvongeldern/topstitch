import { DataTypes, Sequelize } from 'sequelize';

const TABLE_NAME = 'garment_types';

function up(queryInterface) {
  return queryInterface.createTable(TABLE_NAME, {
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
  });
}

function down(queryInterface) {
  return queryInterface.dropTable(TABLE_NAME);
}

export default { down, up };
