import {Client} from "pg"
import dbConnection from "./dbConnection.json"
import testDbConnection from "./testDbConnection.json"
const connection = (() =>{
    if(process.env["DATABASE_URL"]){
        return process.env["DATABASE_URL"] as string
    }else{
        return process.env.NODE_ENV === "test" ? testDbConnection : dbConnection
    }
})()

const pgClient = new Client(connection)

export default pgClient