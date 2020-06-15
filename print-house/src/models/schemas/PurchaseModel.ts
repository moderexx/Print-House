import IPurchaseModel from "../interfaces/IPurchaseModel";
import { MaxLength, IsNumberString, IsNumber } from "class-validator";
import ValidableClass from "./ValidableClass";
export default class PurchaseModel extends ValidableClass<IPurchaseModel> implements IPurchaseModel {
  @IsNumberString()
  @MaxLength(255)
  purchaseId: string;
  @IsNumberString()
  @MaxLength(255)
  contractId: string;
  @IsNumberString()
  @MaxLength(255)
  productCode: string;
  @IsNumber()
  amount: number;
}
