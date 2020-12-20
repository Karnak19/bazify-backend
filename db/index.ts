import { PostgresOptions } from 'https://deno.land/x/denodb@v1.0.18/lib/connectors/postgres-connector.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { Database } from '../deps.ts';

config({ export: true });

const options = {
  host: Deno.env.get('DB_HOST'),
  database: Deno.env.get('DB_NAME'),
  username: Deno.env.get('DB_USER'),
  password: Deno.env.get('DB_PASSWORD'),
} as PostgresOptions;

export default new Database('postgres', options);
