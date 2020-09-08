import { Client } from 'pg';
import config from 'config';
import { InternalError } from './errors/internal-error';

export class DatabaseError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error returned by the Database';
    super(`${internalMessage}: ${message}`);
  }
}

/**
 * Database manager class
 */
export class Database {
  private connection: Client;
  private connectionString: string = config.get(
    'App.database.postgres'
  );
  constructor() {
    this.connection = new Client({
      connectionString: this.connectionString,
    });
  }

  public async query(query: string, params: any) {
    try {
      await this.connection.connect();
      const res = await this.connection.query(query, params);
      await this.connection.end();
      return res.rows;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }
}
