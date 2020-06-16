import IFactoryModel from "../interfaces/IFactoryModel";
import { IsNumberString, Length, MaxLength } from "class-validator";
import ValidableClass from "./ValidableClass";

export default class FactoryModel extends ValidableClass<IFactoryModel> implements IFactoryModel{
    @IsNumberString()
    @MaxLength(255)
    factoryId: string;
    @Length(1,50)
    factoryName: string;
}
