import { Request, Response} from 'express'

import { APP_DB } from '../db/database';
import { APIResponse } from '../utils/response';

class PrimsRestApi {
  constructor() {
    //
  }

  getOne(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
  }

  getMany(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
  }

  async createOne(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try {
    } catch (e) {}
  }

  async createMany(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try {
      const condition = req.query.condition;
      let response = {} as Record<string, unknown>;

      // Create role
      if ("role" === condition) {
        console.log("Role", req.body.roles);
        response = await APP_DB.role.createMany({
          data: req.body.roles,
        });
      } else if ("customer" === condition) {
        response = await APP_DB.customer.createMany({
          data: req.body.customers,
        });
      } else if ("product" === condition) {
        response = await APP_DB.product.createMany({
          data: req.body.products
        });
      } else if ("sales" === condition) {
      } else {
        //
      }

      apiResponse.success(response);
    } catch (e: any) {
      apiResponse.faild(e);
    }
  }

  updateOne(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
  }

  updateMany(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
  }

  deleteOne(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
  }

  deleteMany(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
  }

  prismaTarnsaction(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
    console.log("------------------ Transaction ----------------");
  }
}

export default new PrimsRestApi