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

function paginationItems(data, page, limit) {
  return data.slice(limit * (page - 1), limit * page)
}

function paginationPagesCount(data, limit) {
  return Math.ceil(data.length / limit)
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

  async getCars(filter, sortBy, page, limit) {
    const cars = await Car.find()
    let data = cars
    for (let key in filter) {
      const val = filter[key]

      if (val && val !== 'all') {
        switch (key) {
          case 'brand':
          case 'model':
            data = data.filter((item) => item[key] === val)
            break
          case 'transmission':
          case 'drive':
          case 'engineType':
            if (typeof val === 'object') {
              data = data.filter((item) => item[key] === val)
              break
            }
          case 'yearFrom':
            data = data.filter((item) => Number(item.year) >= Number(val))
            break
          case 'yearTo':
            data = data.filter((item) => Number(item.year) <= Number(val))
            break
          case 'engineСapacityFrom':
            data = data.filter((item) => Number(item.engineCapacity) >= Number(val))
            break
          case 'engineСapacityTo':
            data = data.filter((item) => Number(item.engineCapacity) <= Number(val))
            break
          case 'priceFrom':
            if (typeof val === 'string') {
              data = data.filter((item) => Number(item.price) >= Number(val.replace(/\s+/g, '')))
            }
            break
          case 'priceTo':
            if (typeof val === 'string') {
              data = data.filter((item) => Number(item.price) <= Number(val.replace(/\s+/g, '')))
            }
            break
          case 'mileageFrom':
            if (typeof val === 'string') {
              data = data.filter((item) => Number(item.mileage) >= Number(val.replace(/\s+/g, '')))
            }
            break
          case 'mileageTo':
            if (typeof val === 'string') {
              data = data.filter((item) => Number(item.mileage) <= Number(val.replace(/\s+/g, '')))
            }
            break
          default:
            data = cars
        }
      }
    }

    const pagesCount = paginationPagesCount(data, limit)

    switch (sortBy) {
      case 'date':
        data.sort((a, b) => b.createDate - a.createDate)
        break
      case 'price-min':
        data.sort((a, b) => a.price - b.price)
        break
      case 'price-max':
        data.sort((a, b) => b.price - a.price)
        breaks
    }

    data = paginationItems(data, page, limit)

    return {
      success: true,
      message: '',
      data: {
        cars: data,
        pagesCount
      }
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
    const parsedImages = JSON.parse(car.images)
    const carForUpdate = await Car.findOne({idf: car.idf})
    const imagesToDel = []
    carForUpdate.images.forEach(el => {
      if (!parsedImages.includes(el)) imagesToDel.push(el)
    })
    const fileNames = newImages ? FileService.saveCarFiles(newImages) : []
    FileService.deleteCarFiles(imagesToDel)
    const updatedCar = await Car.findOneAndUpdate({idf: car.idf}, {...car, images: [...parsedImages, ...fileNames ]}, {new: true})
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