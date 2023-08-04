import { Schema, model } from 'mongoose'
import { Order } from '../interfaces/order'

const OrderSchema = new Schema<Order>(
  {
    products: [
      {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        discountPercentage: { type: Number, default: 0 },
        subtotal: { type: Number, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category' }
      }
    ],
    total: { type: Number, required: true },
    quantity: { type: Number, required: true },
    state: { type: String, enum: ['Realizado', 'Pendiente'], default: 'Pendiente' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

OrderSchema.methods.toJSON = function () {
  const orderObject = this.toObject()
  delete orderObject.updatedAt
  return orderObject
}

export const OrderModel = model<Order>('Order', OrderSchema)
