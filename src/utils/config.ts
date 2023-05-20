import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DATABASE_NAME,
  POSTGRES_DATABASE_TEST_NAME,
} = process.env;

export default {
  port: PORT,
  nodeEnv: NODE_ENV,
  databaseUrl: DATABASE_URL,
  postgresHost: POSTGRES_HOST,
  postgresUser: POSTGRES_USER,
  postgresPassword: POSTGRES_PASSWORD,
  postgresPort: POSTGRES_PORT,
  postgresDatabaseName: POSTGRES_DATABASE_NAME,
  postgresDatabaseTestName: POSTGRES_DATABASE_TEST_NAME,
};
