import { Request, Response } from "express";
import { MESG_AND_STATUS_CODE, defaultStatusCode, statusCode } from '../app-constant/request-response'

export class APIResponse {
  apiReq: Request;
  apiRes: Response;
  codeWithMsg: Record<string, any>;

  constructor(apiReq: Request | any, apiRes: Response | any) {
    this.apiReq = apiReq;
    this.apiRes = apiRes;
    this.codeWithMsg = MESG_AND_STATUS_CODE;
  }

  success(resData: Record<string, unknown> | Record<string, unknown>[], passHeader?: boolean) {
    const [code, message] = this.codeWithMsg[this.apiReq.method];
    const customResObj = {
      status: true,
      statusCode: code,
      message
    } as  Record<string, any>;
    
    if(passHeader){
      const { headerName, token, userName }: Record<string, any> = resData;
      customResObj.message = 'User logged in successfully'
      customResObj.userName = userName
      customResObj.token = token
      this.apiRes.setHeader(headerName, token)
    }else{
      customResObj.resData = resData
    }
    
    this.apiRes.status(defaultStatusCode).send(customResObj)
  }

  faild(error: Error | any) {
    const customResObj = {
      status: false,
      statusCode: error.statusCode ? error.statusCode : statusCode[7], 
      message: error['message'],
    } as Record<string, any>;

    this.apiRes.status(defaultStatusCode).send(customResObj);
  }
}
