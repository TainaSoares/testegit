import { Request, Response } from "express"
import app from "./app"
import { cotacaoInfo } from "./services/cotacaoInfo"

app.get("/", (req:Request, res:Response) => {
    res.send("Hello world")
})




