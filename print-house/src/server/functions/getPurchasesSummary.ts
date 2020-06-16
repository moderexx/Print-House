import IGetBetweenDatesRequestModel from "../../models/interfaces/IGetBetweenDatesRequestModel";
import pgClient from "../../data/pgClient";

export default async  function getPurchasesSummary(request:IGetBetweenDatesRequestModel){
    
    const startDate = new Date(request.fromTime).toISOString().slice(0,10)
    const endDate = new Date(request.toTime).toISOString().slice(0,10)
    
    const queryResult = await pgClient.query(
    `
    SELECT 
    ROUND(NULLIF(SUM("productPrice"*"amount"),0),2) AS "sum",
    ROUND(AVG("productPrice"),2) as "avg",
    COUNT("purchaseId") AS "count"
    FROM purchases
    INNER JOIN products ON products."productCode"=purchases."productCode"
    INNER JOIN contracts ON contracts."contractId"=purchases."contractId"
    WHERE contracts."contractFulfilledOn" BETWEEN $1 AND $2;
    `
    ,
[startDate,endDate])

return queryResult.rows[0]
}