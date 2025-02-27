import Car from './Car.js'
import FileService from '../FileService.js'
import {idfGenerator} from '../utils/idfGenerator.js'

const getCarData = (car) => {
  return {
    idf: car.idf,
    images: car.images,
    model: car.model,
    color: car.color,
    engineType: car.engineType,
    engineCapacity: car.engineCapacity,
    drive: car.drive,
    enginePower: car.enginePower,
    transmission: car.transmission,
    leftHandDrive: car.leftHandDrive,
    year: car.year,
    mileage: car.mileage,
    price: car.price,
    descr: car.descr,
    authorIdf: car.authorIdf,
    authorName: car.authorName,
    authorAvatar: car.authorAvatar,
    authorPhone: car.authorPhone,
    authorLocation: car.authorLocation,
  }
}

class CarService {
  async addCar(car, images) {
    const fileNames = FileService.saveCarFiles(images)
    const addedCar = await Car.create({...car, images: fileNames, idf: idfGenerator()})
    return {
      success: true,
      message: 'Объявление успешно добавлено',
      data: addedCar
    }
  }

  async getAllCars() {
    const cars = await Car.find()
    return {
      success: true,
      message: '',
      data: cars
    }
  }

  async getCarByIdf(idf) {
    if (!idf) {
      throw new Error('Idf не указан')
    }
    const car = await Car.findOne({idf})
    return {
      success: true,
      message: '',
      data: car
    }
  }

  async getFavorites(body) {
    const cars = []
    for (let carIdf of body.idfs) {
      const car = await Car.findOne({idf: carIdf})
      if (car) cars.push(car)
    }
    return {
      success: true,
      message: '',
      data: cars
    }
  }

  async getUserCars(idf) {
    const cars = await Car.find({authorIdf: idf})
    return {
      success: true,
      message: '',
      data: cars
    }
  }

  async updateCar(car, newImages) {
    // const carForUpdate = await Car.findOne({idf: car.idf})
    const fileNames = newImages ? FileService.saveCarFiles(newImages) : []
    const updatedCar = await Car.findOneAndUpdate({idf: car.idf}, {...car, images: [...JSON.parse(car.images), ...fileNames ]}, {new: true})

    // if (userForUpdate.avatar && (user.avatar !== userForUpdate.avatar)) {
    //   FileService.deleteCarFiles(userForUpdate.avatar)
    // }
    return {
      success: true,
      message: 'Объявление успешно обновлено',
      data: updatedCar
    }
  }

  async deleteCar(idf) {
    const deletedCar = await Car.findOneAndDelete({idf})
    return {
      success: true,
      message: 'Объявление успешно удалено',
      data: deletedCar
    }
  }
}

export default new CarService()