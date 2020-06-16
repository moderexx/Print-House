import { Router } from "express";
import IGetBetweenDatesRequestModel from "../../models/interfaces/IGetBetweenDatesRequestModel";
import GetBetweenDatesRequestModel from "../../models/schemas/GetBetweenDatesRequestModel";
import getPurchasesSummary from "../functions/getPurchasesSummary";

const router = Router()

router.get("/summary", (req,res)=>{
    const query = req.query as never as IGetBetweenDatesRequestModel

    for(const key in query){
        // when a number is in a query, I guess its getting parsed to string
        query[key as never] = parseInt(query[key as never]) as never
    }
    console.log(query)
    const validating = new GetBetweenDatesRequestModel(query)
    validating.validate()
    .then(()=>{
        getPurchasesSummary(validating)
        .then((r)=>res.json(r))
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(400).send(`${error}`))
})

const purchasesRouter = router

export default purchasesRouter