import express, { Router } from "express";
import purchasesRouter from "./routes/purchasesRouter";
import pgClient from "../data/pgClient";
import productRouter from "./routes/productsRouter";
import clientsRouter from "./routes/clientsRouter";
import path from 'path'
import getProducts from "./functions/getProducts";
import { readFileSync, readFile } from "fs";

pgClient.connect().then(async ()=>{
    // Frist creating the tables if they do not exist
    const query = readFileSync(path.resolve(__dirname,"../data/tables.sql")).toString()
    await pgClient.query(query).catch(error => console.error(`Error at creating tables ${error}`))
    
    
    const products = await getProducts()
    if(!products.length){
        // populating the database for testing purposes
        // only populating where there are no product records
        readFile(path.resolve(__dirname,"../data/testpopulate.sql"),async (error,data)=>{
            
            await pgClient.query(data.toString("utf8")).catch(error => console.error(`Error while populating the database ${error}`))
        })

        console.log("populating database")
        
        
    }
   

})
const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

const apiRouter = Router()

apiRouter.use("/purchases",purchasesRouter)
apiRouter.use("/products",productRouter)
apiRouter.use("/clients",clientsRouter)

app.use("/api",apiRouter)

//react configuration
app.use(express.static(path.resolve(__dirname + "../../../build/")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "../../../build/index.html"));
});


app.listen(process.env["PORT"] || 80,()=>console.log("listening on 80"))