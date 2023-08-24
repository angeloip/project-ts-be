import { z } from 'zod'
import { Product } from '../interfaces/product'

const productSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(3, { message: 'El nombre es muy corto' }),
  description: z
    .string({ required_error: 'La descripción es requerida' })
    .min(10, { message: 'La descripción es muy corta' }),
  price: z
    .number({
      required_error: 'El precio es requerido',
      invalid_type_error: 'El precio debe ser un número'
    })
    .min(1, { message: 'El precio debe ser mayor a 1' }),
  stock: z
    .number({
      required_error: 'El stock es requerido',
      invalid_type_error: 'El stock debe ser un número'
    })
    .int({ message: 'El stock debe ser un número entero' })
    .min(1, { message: 'El stock debe ser mayor a 1' }),
  category: z
    .string({ required_error: 'La categoría es requerida' })
    .min(3, { message: 'La categoría es muy corta' })
})

export const validateProduct = (data: Product) => {
  return productSchema.safeParse(data)
}

export const validatePartialProduct = (data: Partial<Product>) => {
  return productSchema.partial().safeParse(data)
}
