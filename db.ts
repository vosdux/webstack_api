import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'webstack',
  'postgres',
  '123',
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
  },
);

export default sequelize;
