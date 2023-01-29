import { Request, Response } from "express";
import { APP_DB } from "../db/database";
import { APIResponse } from "../utils/response";

class TodoList {
  constructor() {
    // Empty
  }

  async getAllTodo(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try {
      const responseData = await APP_DB.todo.findMany();
      responseData.map(
        (item: Record<string, any>, idx) => (item.seno = idx + 1)
      );

      apiResponse.success(responseData);
    } catch (err: any) {
      res.send({
        message: err.message,
      });
    }
  }

  async addTodo(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try {
      const responseData = await APP_DB.todo.create({ data: { ...req.body } });
      apiResponse.success(responseData);
      // res.send({
      //   data: responseData,
      // });
    } catch (error: any) {
      apiResponse.faild(error);
    }
  }

  async updateTodo(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try {

      const responseData = await APP_DB.todo.update({
        where: {
          id: Number(req.params.id),
        },
        data: { ...req.body },
      });
      apiResponse.success(responseData);

    } catch (error: any) {
      apiResponse.faild(error);
    }
  }

  async deleteTodo(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try {
      const responseData = await APP_DB.todo.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      apiResponse.success(responseData);
    } catch (error: any) {
      apiResponse.faild(error);
    }
  }

  async getRolles(req: Request, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try{
      const resData = await APP_DB.role.findMany();
      console.log("ALL role", resData)
      apiResponse.success(resData)
    }catch(e){
      apiResponse.faild(e)
    }
  }
}

export default new TodoList();
