import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user'

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const UserModel = model<User>('User', UserSchema)
