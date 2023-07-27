import { Schema, model } from 'mongoose'
import { Order } from '../interfaces/order'

const OrderSchema = new Schema<Order>(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    price: [{ type: Number, required: true }],
    quantities: [{ type: Number, required: true }],
    total: { type: Number, required: true },
    state: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const OrderModel = model<Order>('Product', OrderSchema)
