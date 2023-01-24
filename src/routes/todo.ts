import { Express, Router } from 'express'
import TodoList from '../controller/todo'

export function todoRoutes(app: any): Router {
    const route = app.Router()


    route.get('/todo-list', TodoList.getAllTodo)
    route.post('/add-todo', TodoList.addTodo)
    route.put('/update-todo/:id', TodoList.updateTodo)
    route.delete('/delete-todo/:id', TodoList.deleteTodo)

    return route
}