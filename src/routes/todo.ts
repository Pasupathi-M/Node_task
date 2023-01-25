import { Express, Router } from 'express'
import  { TodoList } from '../controller/index'
import * as AppMiddleWare from '../middleware/index'

export function todoRoutes(app: any): Router {
    const route = app.Router()


    route.get('/list-todo', TodoList.getAllTodo)
    route.post('/add-todo', TodoList.addTodo)
    route.put('/update-todo/:id', TodoList.updateTodo)
    route.delete('/delete-todo/:id', TodoList.deleteTodo)

    return route
}