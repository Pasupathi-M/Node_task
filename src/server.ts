import express, { Express } from 'express'

import { todoRoutes } from './routes/todo'
import cors from 'cors'

const App: Express = express()

App.use(express.urlencoded({ extended: true }))
App.use(express.json())
App.use(cors())

App.use(todoRoutes(express))

const port = process.env.PORT || 3040
App.listen(port, ()=> {
    console.log(`App listening on http://localhost:${port}`);
})

