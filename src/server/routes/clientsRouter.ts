import { Router } from "express";
import IGetBetweenDatesRequestModel from "../../models/interfaces/IGetBetweenDatesRequestModel";
import GetBetweenDatesRequestModel from "../../models/schemas/GetBetweenDatesRequestModel";
import getClientsSummary from "../functions/getClientsSummary";

const router = Router()

router.get("/summary",(req,res)=>{
    const query = req.query as never as IGetBetweenDatesRequestModel
    
    for(const key in query){
        // when a number is in a query, I guess its getting parsed to string
        query[key as never] = parseInt(query[key as never]) as never
    }
    const validator = new GetBetweenDatesRequestModel(query)

    validator.validate()
    .then(()=>{
        getClientsSummary(query)
        .then(r => res.json(r))
        .catch(e => res.status(500).send(`${e}`))
    })
    .catch(e => res.status(400).send(`${e}`))
})

const clientsRouter = router

export default clientsRouter