import { DB } from "../../../../common/DbConnect";

export default async function handler(req, res) {
  const Pool = await DB.MySqlConn.getInstance.connect();
  try {
    const id = req.query.id;
    const sql = `delete from a1_project where id=${id} `;
    const result = await Pool.query(sql);
    return res.status(200).json(result[0].affectedRows);

    // return res.status(200).json(id);
  } catch (e) {
    throw new Error(e);
  }
}
