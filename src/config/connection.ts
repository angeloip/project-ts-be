import { connect } from 'mongoose'

export const dbConnect = async (): Promise<void> => {
  await connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log('Conexión correcta a MongoDB')
    })
    .catch((error) => {
      console.log(error)
    })
}
