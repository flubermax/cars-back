import Router from 'express'
import UserController from '../users/UserController.js'
import { check } from 'express-validator'
import authMiddleware from '../middlewares/authMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'

const router = new Router()

router.get('/auth', authMiddleware, UserController.auth)

router.get('/', roleMiddleware(['ADMIN']), UserController.getAllUsers)
// router.get('/', [
//   authMiddleware,
//   roleMiddleware(['ADMIN'])
// ], UserController.getAllUsers)
router.get('/:id', UserController.getUserById)

router.post('/register', [
  check('login', 'Логин должен содержать символы').notEmpty(),
  check('password', 'Пароль должен состоять минимум из 4х символов').isLength({min: 4})
], UserController.registerUser)

router.post('/login', UserController.loginUser)

router.post('/update-profile', UserController.updateUserProfile)

router.post('/update-password', UserController.updateUserPassword)

router.post('/add-to-fav', UserController.addToFav)

router.delete('/delete/:id', UserController.deleteUser)

export default router