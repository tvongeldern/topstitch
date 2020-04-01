// import { DataTypes, Sequelize } from 'sequelize';

// const DEFAULT_COLUMNS = {
//   id: {
//     type: DataTypes.UUID,
//     primaryKey: true,
//     allowNull: false,
//     unique: true,
//     defaultValue: Sequelize.UUIDV4,
//   },
//   createdAt: {
//     allowNull: false,
//     type: DataTypes.DATE
//   },
//   updatedAt: {
//     allowNull: false,
//     type: DataTypes.DATE
//   },
// };

// const TABLES = {
//   accounts: {},
//   brands: {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//   },
//   collections: {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   fits: {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     garmentType: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: 'garment_types',
//         key: 'id',
//       },
//     },
//   },
//   garment_segments: {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   garment_types: {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   lines: {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   sizes: {},
// };

// const tables = Object.entries(TABLES).map(([name, columns]) => [
//   name,
//   {
//     ...DEFAULT_COLUMNS,
//     ...columns,
//   },
// ]);

// function up(queryInterface) {
//   return Promise.all(
//     tables.map((table) => queryInterface.createTable(...table)),
//   );
// }

// function down(queryInterface) {
//   return queryInterface.dropTable(TABLE_NAME);
// }

// export default { down, up };
