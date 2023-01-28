import express, { Express, Router } from "express";

import * as Controller from "../controller/index";
import * as AuthMiddleWare from '../middleware/authentication'

export function AppRoutes(app: any): express.Router {
  const route = app.Router();

  //-----------------------Create user------------------

  route
    .post("/create-user", Controller.Auth.createUser)
    .post("/signin-user", Controller.Auth.userSignIn);

  //------------------------ TODO--------------------------------

  route.get("/list-todo", AuthMiddleWare.Authentication, Controller.TodoList.getAllTodo);
  route.post("/add-todo", AuthMiddleWare.Authentication, Controller.TodoList.addTodo);
  route.put("/update-todo/:id", AuthMiddleWare.Authentication, Controller.TodoList.updateTodo);
  route.delete("/delete-todo/:id", AuthMiddleWare.Authentication, Controller.TodoList.deleteTodo);


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
