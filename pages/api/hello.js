import mysql from "mysql2/promise"

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  connectionLimit : 50,
  queueLimit : 5000,
  charset: "utf8_general_ci"
})

export default async function handler(req, res) 
{
  const conn = await connection.getConnection()
  try {
      await conn.execute("set names utf8mb4")
      const result = await conn.execute("SELECT * FROM tmptbl")
      const ret = result[0];
      res.status(200).json(ret)
  } catch (e) {
      throw new Error(e)
  } finally {
      conn.release() // pool 을 돌려주는 역할을 한다.
  }
}
