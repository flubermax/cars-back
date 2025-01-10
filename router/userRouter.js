import Router from 'express'
import UserController from '../users/UserController.js'
import { check } from 'express-validator'

const router = new Router()

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUserById)
router.post('/register', [
  check('login', 'Логин должен содержать символы').notEmpty(),
  check('password', 'Пароль должен быть не короче 4х символов').isLength({min: 4})
], UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/update', UserController.updateUser)
router.put('/update', UserController.updateUser)
router.delete('/delete/:id', UserController.deleteUser)

export default router