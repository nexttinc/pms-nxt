// import { DB } from "../../../common/DbConnect";
// const Pool = await DB.MySqlConn.getInstance.connect();
import dbPool from "../../../common/dbPool";
const Pool = dbPool.connect();

export default async function handler(req, res) {
  try {
    const page = req.query.page;
    const rowNum = req.query.rownum;
    const sIndex = rowNum * (page - 1);

    await Pool.query("set names utf8mb4");
    const prjSql = `select * from pms_project order by id desc limit ${sIndex}, ${rowNum} `;
    const [prjRows] = await Pool.query(prjSql);
    const cntSql = `select count(*) as totCnt from pms_project`;
    const [cntRows] = await Pool.query(cntSql);

    const retArr = [cntRows[0].totCnt, prjRows];
    return res.status(200).json(retArr);
  } catch (e) {
    throw new Error(e);
  }
}
