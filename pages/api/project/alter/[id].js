import { DB } from "../../../../common/DbConnect";

export default async function handler(req, res) {
  const method = req.method;

  if (method == "POST") {
    try {
      const id = req.query.id;
      const Pool = await DB.MySqlConn.getInstance.connect();
      const body = req.body;
      const sql = `update a1_project set  
                                    projectName = '${body.projectName}',
                                    downPayment = '${body.downPayment}',
                                    allocPlan = '${body.allocPlan}',
                                    allocDesign = '${body.allocDesign}',
                                    allocPub = '${body.allocPub}',
                                    allocDev = '${body.allocDev}',
                                    member = '${body.member}',
                                    startDate = '${body.sDate}',
                                    endDate = '${body.eDate}',
                                    status = '${body.status}'
                  where id=${id}
                              `;
      const result = await Pool.query(sql);
      return res.status(200).json(result[0].affectedRows);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
}
