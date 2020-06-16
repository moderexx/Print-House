import IContractModel from "../interfaces/IContractModel";
import { IsNumberString, MaxLength, IsDate } from "class-validator";
import ValidableClass from "./ValidableClass";

export default class ContractModel extends ValidableClass<IContractModel> implements IContractModel {
                 @IsNumberString()
                 @MaxLength(255)
                 contractId: string;
                 @IsNumberString()
                 @MaxLength(255)
                 clientId: string;
                 @IsDate()
                 contractFulfilledOn: Date;
               }