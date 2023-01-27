import { NextFunction } from "express";

export const dateConvert = (req: Request | any, res: Response, next: NextFunction) => {
    if(req.query.postman === req.body){
        const reqString = JSON.stringify(req.body)
        const dateFormat = new Date().toLocaleDateString('fr-CA', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })
        reqString.replace(/<>/g, dateFormat)

        req.body = JSON.parse(reqString)
        console.log(req.body)
    }
    next()
}
