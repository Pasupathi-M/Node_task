import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

import { APIResponse } from "../utils/response";
import { SECRET_KEY } from '../app-constant/auth'

export const Authentication = async (
  req: Request | Record<string, any>,
  res: Response,
  next: NextFunction
) => {
  const apiResponse = new APIResponse(req, res);
  try {
    console.log("Req", req.headers)
    const token = req.headers['access-token'] ? req.headers['access-token']: req.headers['authorization'].replace(/Bearer/g, '').trim();
    console.log("token", token)
    if(!token) return apiResponse.faild({ message: 'Unauthorized user', statusCode: 403})
    const jwtData = jwt.verify(token, SECRET_KEY)
    console.log("jwtData", jwtData)
    next()
  } catch (e: any) {
    apiResponse.faild(e);
  }

};
