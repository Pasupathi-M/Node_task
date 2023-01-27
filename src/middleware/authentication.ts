import { NextFunction } from "express";
import { APIResponse } from "../utils/response";

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiResponse = new APIResponse(req, res);
  try {
    const token = req.headers.get("access-token");
    if(token) {
        // Check token
    }
  } catch (e: any) {
    apiResponse.faild(e);
  }

  next();
};
