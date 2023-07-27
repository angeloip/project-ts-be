import { Router } from 'express'
import { multerMiddleware } from '../middlewares/file'
import { productController } from '../controllers/product'

const router = Router()

router.post('/', multerMiddleware, productController.createProduct)
router.get('/', productController.getProducts)
router.get('/:id', productController.getProduct)

export { router }
