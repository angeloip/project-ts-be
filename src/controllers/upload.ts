import { NextFunction, Response } from 'express'
import { RequestExt } from '../interfaces/req-ext'
import { remove } from 'fs-extra'

export const uploadController = {
  getFile: async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      if (req.file) {
        const dataFile = req.file
        await remove(req.file.path)
        return res.status(200).json(dataFile)
      }
      return res.status(200).json('NO HAY FILE')
    } catch (error) {
      next(error)
    }
  }
}
