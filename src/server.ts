import express, { Express } from 'express'
import cors from 'cors'

import { todoRoutes } from './routes/index'
import * as AppMiddleWare from './middleware/index'

const App: Express = express()

// Middlewares
App.use(express.urlencoded({ extended: true }))
App.use(express.json())
App.use(cors())

// Api routes
App.use(todoRoutes(express))

App.use('*', AppMiddleWare.NotFound)

const port = process.env.PORT || 3040

App.listen(port, ()=> {
    console.log(`App listening on http://localhost:${port}`);
})

