import { ResponseStatus } from "../interfaces/enum";

export class commanResponse {
  public ResponseStatus!: ResponseStatus;
  public Result!: any;
  public Message!: string;
  public Status!: boolean;
}
