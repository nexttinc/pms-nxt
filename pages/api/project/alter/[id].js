import { DB } from "../../../../common/DbConnect";

export default async function handler(req, res) {
  const method = req.method;

  if (method == "POST") {
    try {
      const Pool = await DB.MySqlConn.getInstance.connect();
      const id = req.id;
      const {       
        projectName,
        downPayment,
        allocPlan,
        allocDesign,
        allocPub,
        allocDev,
        member,
        sDate,
        eDate,
        status
   } = JSON.parse(req.body);

      const sql = `update a1_project set  `;
      const result = await Pool.query(sql);
      return res.status(200).json(result[0].affectedRows);
    } catch (e) {
      throw new Error(e);
    }
  }
}
