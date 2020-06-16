import IGetBetweenDatesRequestModel from "../../models/interfaces/IGetBetweenDatesRequestModel";
import pgClient from "../../data/pgClient";

export default async function getClientsSummary(request:IGetBetweenDatesRequestModel){
    const startDate = new Date(request.fromTime).toISOString().slice(0,10)
    const endDate = new Date(request.toTime).toISOString().slice(0,10)
    const queryResult = await pgClient.query(
`
SELECT SUM("productPrice"*amount),clients."clientId" AS "clientId",clients."clientName" AS "clientName" FROM purchases
INNER JOIN contracts ON contracts."contractId"=purchases."contractId"

INNER JOIN products ON products."productCode"=purchases."productCode"
INNER JOIN clients ON clients."clientId"=contracts."clientId"
WHERE contracts."contractFulfilledOn" BETWEEN $1 AND $2
GROUP BY clients."clientName",clients."clientId"
ORDER BY sum DESC;
`

,[startDate,endDate])

return queryResult.rows
}