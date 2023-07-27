import { NextFunction, Request, Response } from 'express'
import { ProductModel } from '../models/product'
import { remove } from 'fs-extra'
import { uploadProductPicture } from '../helpers/cloudinary'

export const productController = {
  getProducts: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await ProductModel.find({})
      return res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  },
  getProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const product = await ProductModel.findById(id)
      if (!product)
        return res.status(400).json({ msg: 'Producto no encontrado' })

      return res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  },
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = req.body

      if (req.file) {
        const result = await uploadProductPicture(req.file.path)
        await remove(req.file.path)
        const image = {
          url: result.secure_url,
          public_id: result.public_id
        }
        product.thumbnail = image
      }

      const newProduct = new ProductModel(product)
      await newProduct.save()

      return res.status(200).json({ msg: 'Producto creado' })
    } catch (error) {
      next(error)
    }
  },
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const product = await ProductModel.findById(id)
      if (!product)
        return res.status(400).json({ msg: 'Producto no encontrado' })

      const data = req.body
      await ProductModel.findByIdAndUpdate(id, data, {
        new: true
      })
      return res.status(200).json({ msg: 'Producto actualizado' })
    } catch (error) {
      next(error)
    }
  },
  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const product = await ProductModel.findById(id)
      if (!product)
        return res.status(400).json({ msg: 'Producto no encontrado' })

      await ProductModel.findByIdAndDelete(id)
      return res.status(200).json({ msg: 'Producto eliminado' })
    } catch (error) {
      next(error)
    }
  }
}
