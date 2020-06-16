import IProductModel from "../../models/interfaces/IProductModel";
import pgClient from "../../data/pgClient";
import IFactoryModel from "../../models/interfaces/IFactoryModel";

export default  async function getProducts():Promise<Array<IProductModel&IFactoryModel>>{
    
    const queryResult = await pgClient.query
    (
    `
    SELECT * FROM products
    INNER JOIN factories ON products."factoryId"=factories."factoryId";
    `
    )
    return queryResult.rows
}