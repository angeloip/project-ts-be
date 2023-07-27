import { NextFunction, Response } from 'express'
import { RequestExt } from '../interfaces/req-ext'

export const orderController = {
  getItems: (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        msg: 'Esto solo lo ve la gente con sesión válida',
        user: req.user
      })
    } catch (error) {
      next(error)
    }
  }
}
