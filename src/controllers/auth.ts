import { NextFunction, Request, Response } from 'express'
import { loginUser, registerNewUser } from '../services/auth'
import { getUserByEmail } from '../services/user'
import { verify } from 'jsonwebtoken'
import { access } from '../helpers/jwt'

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body
      const responseUser = await getUserByEmail(user.email)

      if (responseUser)
        return res.status(400).json({ msg: 'El correo ya está en uso' })

      await registerNewUser(user)

      return res.status(200).json({ msg: 'Usuario registrado' })
    } catch (error) {
      next(error)
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body
      const responseUser = await loginUser(user)
      if (responseUser === 'USER_NOT_FOUND')
        return res
          .status(400)
          .json({ msg: 'El correo no pertenece a una cuenta' })

      if (responseUser === 'INCORRECT_PASSWORD')
        return res.status(400).json({ msg: 'Contraseña incorrecta' })

      return res.status(200).json(responseUser)
    } catch (error) {
      next(error)
    }
  },
  accessToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rf_token: string = req.cookies.rftoken

      if (!rf_token)
        return res
          .status(400)
          .json({ msg: 'Por favor, inicie sesión nuevamente' })

      verify(rf_token, process.env.REFRESH_TOKEN as string, (err, user) => {
        if (err)
          return res
            .status(400)
            .json({ msg: 'Por favor, inicie sesión nuevamente' })

        const userToken = user as { id: string }
        const ac_token = access({ id: userToken.id })

        return res.status(200).json({ ac_token })
      })
    } catch (error) {
      next(error)
    }
  },
  signOut: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('rftoken')

      return res.status(200).json({ msg: 'Ha cerrado sesión' })
    } catch (error) {
      next(error)
    }
  }
}
