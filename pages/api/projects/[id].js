import { DB } from "../../../common/DbConnect";

export default async function handler(req, res) {
  const Pool = await DB.MySqlConn.getInstance.connect();
  try {
    const id = req.query.id;
    await Pool.query("set names utf8mb4");
    const sql = `select * from a1_project where id=${id} `;
    const [row] = await Pool.query(sql);
    const resArr = [row];
    return res.status(200).json(resArr[0][0]);
    // return res.status(200).json(id);
  } catch (e) {
    throw new Error(e);
  }
}
