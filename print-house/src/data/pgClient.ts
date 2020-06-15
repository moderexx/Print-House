import {Client} from "pg"
import dbConnection from "./dbConnection.json"
import testDbConnection from "./testDbConnection.json"
const connection = process.env.NODE_ENV === "test" ? testDbConnection : dbConnection
const pgClient = new Client(connection)

export default pgClient