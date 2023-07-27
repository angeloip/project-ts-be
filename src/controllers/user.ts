import { NextFunction, Response } from 'express'
import { UserModel } from '../models/user'
import { RequestExt } from '../interfaces/req-ext'

export const userController = {
  getUser: async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.user?.id).select(
        '-password -__v -updatedAt'
      )

      res.status(200).json({ user })
    } catch (error) {
      next(error)
    }
  }
}
