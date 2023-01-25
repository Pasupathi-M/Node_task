import { Request, Response } from "express";
import { MESG_AND_STATUS_CODE, defaultStatusCode, statusCode } from '../app-constant/request-response'

export class APIResponse {
  apiReq: Request;
  apiRes: Response;
  codeWithMsg: Record<string, any>;

  constructor(apiReq: Request, apiRes: Response) {
    this.apiReq = apiReq;
    this.apiRes = apiRes;
    this.codeWithMsg = MESG_AND_STATUS_CODE;
  }

  success(resData: Record<string, unknown> | Record<string, unknown>[]) {
    const [code, message] = this.codeWithMsg[this.apiReq.method];
    const customResObj = {
      resData,
      status: true,
      statusCode: code,
      message
    } as  Record<string, any>;
    this.apiRes.status(defaultStatusCode).send(customResObj)
  }

  faild(error: Error) {
    const customResObj = {
      status: false,
      statusCode: statusCode[7], 
      message: error['message'],
    } as Record<string, any>;

    this.apiRes.status(defaultStatusCode).send(customResObj);
  }
}
