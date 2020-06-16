import express from "express";
import purchasesRouter from "./routes/purchasesRouter";
import pgClient from "../data/pgClient";
import productRouter from "./routes/productsRouter";
import clientsRouter from "./routes/clientsRouter";
pgClient.connect()
const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/purchases",purchasesRouter)
app.use("/products",productRouter)
app.use("/clients",clientsRouter)

app.listen(80,()=>console.log("listening on 80"))