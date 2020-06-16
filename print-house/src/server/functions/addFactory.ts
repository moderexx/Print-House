import pgClient from "../../data/pgClient";
import IFactoryModel from "../../models/interfaces/IFactoryModel";

export default function addFactory(factory: Omit<IFactoryModel,"factoryId">) {
    
    return pgClient.query(`INSERT INTO factories ("factoryName") VALUES($1);`,[factory.factoryName])
}
