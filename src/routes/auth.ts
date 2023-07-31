import { Router } from 'express'
import { authController } from '../controllers/auth'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/access', authController.accessToken)
router.post('/logout', authController.logout)

export { router }
