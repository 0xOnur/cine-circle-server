import { Request } from "express";

export interface IAuthReq extends Request {
    user?: IDecoded;
}