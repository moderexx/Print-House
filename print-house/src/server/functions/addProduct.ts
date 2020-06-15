import IProductModel from "../../models/interfaces/IProductModel";
import pgClient from "../../data/pgClient";

export default async function addProduct(product:IProductModel){
    return await pgClient.query(`INSERT INTO products(factoryId,productName,productPrice)
    VALUES($1,$2,$3);`,[product.factoryId,product.productName,product.productPrice])
}