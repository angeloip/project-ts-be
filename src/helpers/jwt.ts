import { sign } from 'jsonwebtoken'

export const generateToken = (payload: object) => {
  return sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' })
}

export const refresh = (payload: { id: string }) => {
  return sign(payload, process.env.REFRESH_TOKEN as string, {
    expiresIn: '24h'
  })
}

export const access = (payload: { id: string }) => {
  return sign(payload, process.env.ACCESS_TOKEN as string, { expiresIn: '15m' })
}
