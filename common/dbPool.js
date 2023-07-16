import mysql from "mysql2";
import config from "./dbConfig";

module.exports = {
  connect: function () {
    const pool = mysql.createPool(config).promise();
    return pool;
  },

  query: async function (pool, sql) {
    const [rows, fields] = await pool.execute(sql);
  },
};
