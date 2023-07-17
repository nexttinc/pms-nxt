import mysql from "mysql2";
// import config from "./dbConfig";

module.exports = {
  connect: function () {
    const pool = mysql
      .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        connectionLimit: 10,
        charset: "utf8_general_ci",
      })
      .promise();
    return pool;
  },

  query: async function (pool, sql, params) {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  },
};
