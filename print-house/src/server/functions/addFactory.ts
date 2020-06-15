import pgClient from "../../data/pgClient";
import IFactoryModel from "../../models/interfaces/IFactoryModel";

export default function addFactory(factory: IFactoryModel) {
    

    return pgClient.query(`INSERT INTO factories ("factoryName") VALUES($1);`,[factory.factoryName])
}
addFactory({factoryId:"0",factoryName:"Drago"}).then(()=>console.log("done"))