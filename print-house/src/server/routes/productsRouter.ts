import { Router } from "express";
import getProducts from "../functions/getProducts";

const router = Router()

router.get("/",(req,res)=>{
    getProducts()
    .then(products => res.json(products))
    .catch(error => res.status(500).send(`${error}`))
})

const productRouter = router


export default productRouter