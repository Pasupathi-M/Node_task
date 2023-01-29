import express, { Express } from 'express'
import cors from 'cors'
import * as path from 'path'

export const dotenv = require('dotenv').config({ path: path.join(__dirname, `../.env`)})

// import { todoRoutes } from './routes/index'
import { AppRoutes } from './routes/app-routes'
import * as AppMiddleWare from './middleware/index'

const App: Express = express()

// Middlewares
App.use(express.urlencoded({ extended: true }))
App.use(express.json())
App.use(cors({
    exposedHeaders: 'Authorization'
}))

// Api routes
App.use(AppRoutes(express))

App.use('*', AppMiddleWare.NotFound)

const port = process.env.PORT || 3040

App.listen(port, ()=> {
    console.log(`App listening on http://localhost:${port}`);
})

