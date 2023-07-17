import dbPool from "../../../../common/dbPool";
const Pool = dbPool.connect();

export default async function handler(req, res) {
  try {
    const id = req.query.id;
    const sql = `delete from pms_project where id=${id} `;
    const result = await Pool.query(sql);
    return res.status(200).json(result[0].affectedRows);

    // return res.status(200).json(id);
  } catch (e) {
    return res.status(500).json(e.message);
  } finally {
    // Pool.releaseConnection();
  }
}
