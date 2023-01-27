import express, { Express, Router } from "express";

import * as Controller from "../controller/index";

export function AppRoutes(app: any): express.Router {
  const route = app.Router();

  //------------------------ TODO--------------------------------

  route.get("/list-todo", Controller.TodoList.getAllTodo);
  route.post("/add-todo", Controller.TodoList.addTodo);
  route.put("/update-todo/:id", Controller.TodoList.updateTodo);
  route.delete("/delete-todo/:id", Controller.TodoList.deleteTodo);


  //-------------------------Prisma--------------------------------------

  route
    .get("/get-one", Controller.PrismaRestApi.getOne)
    .get("/get-many", Controller.PrismaRestApi.getMany);

  route
    .post("/create-one", Controller.PrismaRestApi.createOne)
    .post("/create-many", Controller.PrismaRestApi.createMany)
    .post("/transaction", Controller.PrismaRestApi.prismaTarnsaction)
    
  route
    .put("/update-one/:id", Controller.PrismaRestApi.updateOne)
    .put("/update-many", Controller.PrismaRestApi.updateMany);

  route
    .delete("/delete-one/:id", Controller.PrismaRestApi.deleteOne)
    .delete("/delete-many", Controller.PrismaRestApi.deleteMany);


  return route;
}
