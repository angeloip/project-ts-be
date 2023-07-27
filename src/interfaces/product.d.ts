export interface Product {
  name: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  category: string
  thumbnail: Thumbnail
}

interface Thumbnail {
  url: string
  public_id: string
}

export type partialProduct = Partial<Product>
