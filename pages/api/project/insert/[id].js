import { DB } from "../../../../common/DbConnect";

export default async function handler(req, res) {
  const method = req.method;

  if (method == "POST") {
    try {
      const Pool = await DB.MySqlConn.getInstance.connect();
      const body = req.body;

      const sql = `insert into a1_project 
                                  set  
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
       `;
      const result = await Pool.query(sql);
      return res.status(200).json(result[0].affectedRows);

      // return res.status(200).json(id);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
}
