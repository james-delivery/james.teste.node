import { Pool } from 'pg';

const client = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default client;
