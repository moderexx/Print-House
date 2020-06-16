import IClientModel from "../models/interfaces/IClientModel"
import ClientModel from "../models/schemas/ClientModel"
import IProductModel from "../models/interfaces/IProductModel"
import ProductModel from "../models/schemas/ProductModel"


describe("validation test", () => {
    it("clientModel",async () => {
        const notValidEntity: IClientModel = {
            clientId: "notvalidbigint",
            clientAddress: "ardsrewrwerwer",
            clientName:"Dragomir"
        }
        const clientModel = new ClientModel(notValidEntity)
        const promise = clientModel.validate()
       await expect(promise).rejects.toThrow(Error)
        
    })
    it("productModel", async () => {
        const validEntity: IProductModel = {
            productCode: "1",
            productName: "tales of Drago",
            factoryId: "3",
            productPrice:"3"
        }
        const validatedEntity = new ProductModel(validEntity)
        await validatedEntity.validate()

        delete validatedEntity["validate"]
        
        expect(validEntity).toEqual(validatedEntity)
    })
})