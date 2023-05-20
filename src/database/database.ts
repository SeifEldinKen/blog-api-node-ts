import { Pool } from 'pg';
import config from '../utils/config';

const pool: Pool = new Pool({
  user: config.postgresUser,
  password: config.postgresPassword,
  host: config.postgresHost,
  port: Number(config.postgresPort),
  database: config.postgresDatabaseName,
});

pool.on('error', (error: Error) => {
  console.log(error.message);
});

export { pool };
