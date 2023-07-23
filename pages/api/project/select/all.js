import dbPool from "../../../../common/dbPool";
const Pool = dbPool.connect();

export default async function handler(req, res) {
  try {
    const prjSql = `select id, projectName as value from pms_project where status='진행중' order by id desc `;
    const [prjRows] = await Pool.query(prjSql);
    const retArr = [prjRows][0];
    return res.status(200).json(retArr);
  } catch (e) {
    return res.status(500).json(e.message);
  }
}
