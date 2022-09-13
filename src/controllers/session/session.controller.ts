import { Request, Response } from "express"
import { IUserLogin } from "../../interfaces/users"
import createDeliveryService from "../../services/delivery/createDelivery.service"
import sessionService from "../../services/session/session.service"

const sessionController = async (req:Request, res: Response) => {
    const { email, password } :IUserLogin = req.body
    const session = sessionService({email, password})
    return res.json(session)
}

export {sessionController}