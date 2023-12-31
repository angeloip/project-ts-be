import { Schema, model } from 'mongoose'
import { Category } from '../interfaces/category'

const CategorySchema = new Schema<Category>(
  {
    name: { type: String, required: true, unique: true, trim: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

CategorySchema.methods.toJSON = function () {
  const categoryObject = this.toObject()
  delete categoryObject.updatedAt
  return categoryObject
}

export const CategoryModel = model<Category>('Category', CategorySchema)
