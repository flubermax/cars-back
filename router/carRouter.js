import Router from 'express'
import CarController from '../cars/CarController.js'

const router = new Router()

router.get('/', CarController.getAllCars)
router.get('/:id', CarController.getCarById)
router.post('/add', CarController.addCar)
router.put('/update', CarController.updateCar)
router.delete('/delete/:id', CarController.deleteCar)

export default router