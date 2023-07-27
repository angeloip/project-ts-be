import { Types } from 'mongoose'

export interface Order {
  products: Types.ObjectId[]
  price: number[]
  quantities: number[]
  total: number
  state: 'Realizado' | 'Pendiente'
  user: Types.ObjectId
}
