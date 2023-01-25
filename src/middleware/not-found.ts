import { Express, Request, Response } from 'express'

export function NotFound(req: Request, res: Response) {
    res.status(404).send({
        message: 'Not found'
    })
}