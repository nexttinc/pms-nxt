import { createPool, Pool } from "mysql2/promise";

export namespace DB {
  export const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    connectionLimit: 5,

    queueLimit: 0,
    charset: "utf8_general_ci",
  };

  export class MySqlConn {
    private static instance: MySqlConn;
    private db?: Pool;

    async connect() {
      try {
        if (this.db) return this.db;

        this.db = await createPool(config);
        // console.warn('DB CONNECT', this.db);
        return await this.db?.getConnection();
      } catch (e) {
        throw new Error(e);
      }
    }

    async release() {
      //if(this.db) await this.db?.destroy();
    }

    static get getInstance() {
      if (!MySqlConn.instance) MySqlConn.instance = new MySqlConn();
      return MySqlConn.instance;
    }
  }
}
