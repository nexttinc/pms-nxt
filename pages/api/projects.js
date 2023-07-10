import { DB } from '../../common/db.connect';

export default async function handler(req, res) {
    const Pool = await DB.MySqlConn.getInstance.connect();
    try {
        // const sIndex = rownum*(page-1);

        await Pool.query('set names utf8mb4');
        const prjSql = `select * from a1_project limit 0, 10`;
        const [prjRows] = await Pool.query(prjSql);
        const cntSql = `select count(*) as totCnt from a1_project`;
        const [cntRows] = await Pool.query(cntSql);

        const retArr = [cntRows[0].totCnt, prjRows];
        return res.status(200).json(retArr);
    } catch (e) {
        throw new Error(e);
    }
}