import dbPool from "../../../common/dbPool";
const Pool = dbPool.connect();

export default async function handler(req, res) {
  let arrRows = [];

  try {
    for (let i = 0; i < 10; i++) {
      const sql = "SELECT * FROM Users";
      const [rows, fields] = await Pool.query(sql);
      arrRows.push(rows);
    }
    return res.status(200).json(arrRows);
  } catch (e) {
    console.log(e);
  }
}
