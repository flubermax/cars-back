import Router from 'express'
import CarController from '../cars/CarController.js'

const router = new Router()

router.get('/', CarController.getAllCars)
router.get('/:idf', CarController.getCarByIdf)
router.post('/add', CarController.addCar)
router.post('/update', CarController.updateCar)
router.post('/favorites', CarController.getFavorites)
router.get('/user-cars/:idf', CarController.getUserCars)
router.get('/delete/:idf', CarController.deleteCar)

export default router