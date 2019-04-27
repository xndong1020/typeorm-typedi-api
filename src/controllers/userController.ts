import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export default class UserController {
  public static getAll = async (request: Request, response: Response) => {
    const userService = new UserService()
    const users = await userService.list()
    response.send(users)
  }

  public static getById = async (request: Request, response: Response) => {
    const { id } = request.params
    const userService = new UserService()
    const user = await userService.byId(id)
    response.send(user)
  }

  public static create = async (request: Request, response: Response) => {
    const userService = new UserService()
    const user = await userService.create(request.body)
    response.status(201).send(user)
  }

  public static update = async (request: Request, response: Response) => {
    const { id } = request.params
    const userService = new UserService()
    await userService.update(id, request.body)
    response.sendStatus(204)
  }

  public static delete = async (request: Request, response: Response) => {
    const { id } = request.params
    const userService = new UserService()
    await userService.del(id)
    response.sendStatus(204)
  }
}
