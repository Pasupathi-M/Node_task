import { Request, Response } from "express";
import { db } from "../db/database";

class TodoList {
  constructor() {
    // Empty
  }

  async getAllTodo(req: Request, res: Response) {
    try {
      const responseData = await db.todo.findMany();
      responseData.map((item: Record<string, any>, idx) => item.seno = idx +1)

      res.send(responseData);
    } catch (err) {
      console.log(err);
    }
  }

  async addTodo(req: Request, res: Response) {
    try {
      console.log("add data",req.body)  
      const responseData = await db.todo.create({ data: { ...req.body }});
      res.send({
        data: responseData,
      });
    } catch (err: any) {
      console.log(err);
      res.send({
        message: err.message
      })
    }
  }

  async updateTodo(req: Request, res: Response) {
   const responseData =  await db.todo.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        todoName: req.body.todoName
      }
    });

    res.send(responseData)
  }

  async deleteTodo(req: Request, res: Response) {

    const responseData = await db.todo.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    
    res.send(responseData)
  }
}

export default new TodoList();
