import { Schema, model } from 'mongoose'
import { Product } from '../interfaces/product'

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    thumbnail: {
      url: {
        type: String,
        trim: true,
        default:
          'https://res.cloudinary.com/dzgiu2txq/image/upload/v1677945017/picture/no-image_abom6f.jpg'
      },
      public_id: { type: String, trim: true, default: '' }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const ProductModel = model<Product>('Product', ProductSchema)
