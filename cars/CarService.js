import Car from './Car.js'
import FileService from '../FileService.js'

class CarService {
  async addCar(car, img) {
    const fileName = FileService.saveFile(img)
    const addedCar = await Car.create({...car, img: fileName})
    return addedCar
  }

  async getAllCars() {
    const cars = await Car.find()
    return cars
  }

  async getCarById(id) {
    if (!id) {
      throw new Error('ID не указан')
    }
    const car = await Car.findById(id)
    return car
  }

  async updateCar(car) {
    if (!car.id) {
      throw new Error('ID не указан')
    }
    const updatedCar = await Car.findByIdAndUpdate(car.id, car, {new: true})
    return updatedCar
  }

  async deleteCar(id) {
    if (!id) {
      throw new Error('ID не указан')
    }
    const deletedCar = await Car.findByIdAndDelete(id)
    return deletedCar
  }
}

export default new CarService()