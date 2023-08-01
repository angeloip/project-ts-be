import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user'

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    avatar: {
      url: {
        type: String,
        default:
          'https://res.cloudinary.com/dzgiu2txq/image/upload/v1665616153/avatar/blank_profile_picture_hf0cjj.png'
      },
      public_id: { type: String, default: '' }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.updatedAt
  return userObject
}

export const UserModel = model<User>('User', UserSchema)
