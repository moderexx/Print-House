import ValidableClass from "./ValidableClass";
import IGetBetweenDatesRequestModel from "../interfaces/IGetBetweenDatesRequestModel";
import { IsNumber } from "class-validator";

export default class GetBetweenDatesRequestModel extends ValidableClass<IGetBetweenDatesRequestModel> implements IGetBetweenDatesRequestModel{
    @IsNumber()
    fromTime: number;
    @IsNumber()
    toTime: number;
}