import IClientModel from "../interfaces/IClientModel";

import { Length, IsNumberString } from "class-validator";
import ValidableClass from "./ValidableClass";
export default class ClientModel extends ValidableClass<IClientModel> implements IClientModel {
  @IsNumberString()
  @Length(1, 30)
  clientId: string;

  @IsNumberString()
  @Length(1, 30)
  clientName: string;

  @IsNumberString()
  @Length(1, 100)
  clientAddress: string;
}
