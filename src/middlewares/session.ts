import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { RequestExt } from '../interfaces/req-ext'

export const checkJwt = (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization

    if (!token) return res.status(401).json({ msg: 'Autenticación fallida' })

    const jwt = token.split(' ').pop()

    verify(jwt as string, process.env.JWT_SECRET as string, (err, user) => {
      if (err) return res.status(401).json({ msg: 'Autenticación fallida' })
      req.user = user as { id: string }

      next()
    })
  } catch (error) {
    next(error)
  }
}
