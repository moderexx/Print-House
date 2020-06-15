import pgClient from "../data/pgClient"
import { readFileSync } from "fs"
import IFactoryModel from "../models/interfaces/IFactoryModel"
import addFactory from "../server/functions/addFactory"
import path from "path"
jest.setTimeout(100000)
const tablesSql = readFileSync(path.resolve(__dirname,"../data/tables.sql")).toString()
beforeAll(async (done) => {
    await pgClient.connect()
    await pgClient.query("DROP TABLE IF EXISTS factories,clients,contracts,products,purchases;")
    await pgClient.query(tablesSql)
    done()
})
describe("database", () => {
    it("factory test", async () => {
        console.log("tablesql", tablesSql)
        const factory: IFactoryModel = {
            factoryName: "Drago",
            factoryId:"1"
        }
        await addFactory(factory)

        const result = await pgClient.query("SELECT * from factories")
        
        expect(result.rows[0]).toEqual(factory)
})
})