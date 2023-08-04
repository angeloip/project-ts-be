export interface Order {
  products: Product[]
  total: number
  quantity: number
  state: 'Realizado' | 'Pendiente'
  user: Types.ObjectId
}

export interface Product {
  name: string
  price: number
  quantity: number
  discountPercentage: number
  subtotal: number
  category: Types.ObjectId
}
