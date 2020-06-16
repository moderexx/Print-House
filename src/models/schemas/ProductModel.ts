import IProductModel from "../interfaces/IProductModel";
import { IsNumberString, MaxLength, IsDecimal, Length, } from "class-validator";
import ValidableClass from "./ValidableClass";

export default class ProductModel extends ValidableClass<IProductModel> implements IProductModel {
 
    @IsNumberString()
                 @MaxLength(255)
                productCode: string;
                @Length(1,30)
                productName: string;
                @IsDecimal()
                productPrice: string;
                @IsNumberString()
                @MaxLength(255)
                factoryId: string;
               }